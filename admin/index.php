<?php
session_start();

// Verificar autenticação
if (empty($_SESSION['admin_logado'])) {
    header('Location: login.php');
    exit;
}

// Caminhos
define('JSON_PATH', '../dados/aparelhos.json');
define('UPLOAD_DIR', '../imagens/');

// Carregar aparelhos
function carregarAparelhos() {
    if (!file_exists(JSON_PATH)) return [];
    $json = file_get_contents(JSON_PATH);
    return json_decode($json, true) ?? [];
}

// Salvar aparelhos
function salvarAparelhos($aparelhos) {
    file_put_contents(JSON_PATH, json_encode(array_values($aparelhos), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Gerar próximo ID
function proximoId($aparelhos) {
    if (empty($aparelhos)) return 1;
    return max(array_column($aparelhos, 'id')) + 1;
}

$mensagem = '';
$tipo_msg = '';

// =============================================
// PROCESSAR AÇÕES POST
// =============================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $acao = $_POST['acao'] ?? '';
    $aparelhos = carregarAparelhos();

    // --- ADICIONAR / EDITAR ---
    if ($acao === 'salvar') {
        $id = intval($_POST['id'] ?? 0);
        $nome   = trim($_POST['nome'] ?? '');
        $preco  = trim($_POST['preco'] ?? '');
        $specs  = trim($_POST['specs'] ?? '');
        $ordem  = intval($_POST['ordem'] ?? 99);
        $destaque = isset($_POST['destaque']) ? true : false;
        $ativo    = isset($_POST['ativo'])    ? true : false;

        // Upload de imagem
        $imagem_path = trim($_POST['imagem_atual'] ?? '');
        if (!empty($_FILES['imagem']['name'])) {
            $ext = strtolower(pathinfo($_FILES['imagem']['name'], PATHINFO_EXTENSION));
            $permitidos = ['jpg','jpeg','png','webp','gif'];
            if (in_array($ext, $permitidos)) {
                $nome_arquivo = 'aparelho_' . time() . '_' . uniqid() . '.' . $ext;
                $destino = UPLOAD_DIR . $nome_arquivo;
                if (move_uploaded_file($_FILES['imagem']['tmp_name'], $destino)) {
                    $imagem_path = 'imagens/' . $nome_arquivo;
                }
            } else {
                $mensagem = 'Formato de imagem inválido. Use JPG, PNG ou WEBP.';
                $tipo_msg = 'erro';
            }
        }

        if (empty($mensagem)) {
            $aparelho = [
                'id'       => $id ?: proximoId($aparelhos),
                'nome'     => $nome,
                'preco'    => $preco,
                'specs'    => $specs,
                'imagem'   => $imagem_path,
                'destaque' => $destaque,
                'ordem'    => $ordem,
                'ativo'    => $ativo,
            ];

            if ($id) {
                // Editar existente
                foreach ($aparelhos as &$a) {
                    if ($a['id'] === $id) { $a = $aparelho; break; }
                }
                unset($a);
                $mensagem = "Aparelho <strong>{$nome}</strong> atualizado com sucesso!";
            } else {
                // Novo
                $aparelhos[] = $aparelho;
                $mensagem = "Aparelho <strong>{$nome}</strong> cadastrado com sucesso!";
            }
            $tipo_msg = 'sucesso';

            // Ordenar por campo ordem
            usort($aparelhos, fn($a, $b) => $a['ordem'] <=> $b['ordem']);
            salvarAparelhos($aparelhos);
        }
    }

    // --- EXCLUIR ---
    if ($acao === 'excluir') {
        $id = intval($_POST['id'] ?? 0);
        $aparelhos = array_filter($aparelhos, fn($a) => $a['id'] !== $id);
        salvarAparelhos($aparelhos);
        $mensagem = 'Aparelho removido com sucesso.';
        $tipo_msg = 'sucesso';
    }

    // --- TOGGLE ATIVO ---
    if ($acao === 'toggle_ativo') {
        $id = intval($_POST['id'] ?? 0);
        foreach ($aparelhos as &$a) {
            if ($a['id'] === $id) { $a['ativo'] = !$a['ativo']; break; }
        }
        unset($a);
        salvarAparelhos($aparelhos);
        header('Location: index.php');
        exit;
    }

    // --- REORDENAR ---
    if ($acao === 'reordenar') {
        $ids_ordem = json_decode($_POST['ids_ordem'] ?? '[]', true);
        $mapa = [];
        foreach ($aparelhos as $a) $mapa[$a['id']] = $a;
        $novos = [];
        foreach ($ids_ordem as $pos => $id) {
            if (isset($mapa[$id])) {
                $mapa[$id]['ordem'] = $pos + 1;
                $novos[] = $mapa[$id];
            }
        }
        salvarAparelhos($novos);
        echo json_encode(['ok' => true]);
        exit;
    }
}

// Carregar aparelhos atuais para exibir
$aparelhos = carregarAparelhos();
usort($aparelhos, fn($a, $b) => $a['ordem'] <=> $b['ordem']);

// Aparelho em edição
$editando = null;
if (isset($_GET['editar'])) {
    $id_edit = intval($_GET['editar']);
    foreach ($aparelhos as $a) {
        if ($a['id'] === $id_edit) { $editando = $a; break; }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin – Restaura Phone Brasil</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body { background: #f5f5f5; }
        .drag-handle { cursor: grab; }
        .drag-handle:active { cursor: grabbing; }
        .sortable-ghost { opacity: 0.4; background: #e5e7eb; }
        .card-aparelho { transition: box-shadow 0.2s; }
        .card-aparelho:hover { box-shadow: 0 8px 25px rgba(0,0,0,0.12); }
        .badge-destaque { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .badge-inativo { background: #9ca3af; }
    </style>
</head>
<body class="min-h-screen">

<!-- NAVBAR -->
<nav class="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
    <div class="flex items-center gap-3">
        <img src="../imagens/LOGO.png" alt="Logo" class="h-8 w-8">
        <div>
            <span class="font-bold text-sm">Restaura Phone Brasil</span>
            <span class="text-gray-400 text-xs block">Painel Admin</span>
        </div>
    </div>
    <div class="flex items-center gap-4">
        <a href="../index.php" target="_blank" class="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Ver site
        </a>
        <a href="logout.php" class="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
            Sair
        </a>
    </div>
</nav>

<div class="max-w-7xl mx-auto px-4 py-8">

    <!-- MENSAGEM DE FEEDBACK -->
    <?php if ($mensagem): ?>
    <div class="mb-6 px-5 py-4 rounded-xl text-sm font-medium flex items-center gap-3 <?= $tipo_msg === 'sucesso' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800' ?>">
        <?php if ($tipo_msg === 'sucesso'): ?>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <?php else: ?>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <?php endif; ?>
        <?= $mensagem ?>
    </div>
    <?php endif; ?>

    <!-- STATS RÁPIDO -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <?php
        $total   = count($aparelhos);
        $ativos  = count(array_filter($aparelhos, fn($a) => $a['ativo']));
        $destaques = count(array_filter($aparelhos, fn($a) => $a['destaque']));
        $inativos  = $total - $ativos;
        ?>
        <div class="bg-white rounded-xl p-5 border border-gray-200">
            <p class="text-3xl font-bold text-black"><?= $total ?></p>
            <p class="text-sm text-gray-500 mt-1">Total de aparelhos</p>
        </div>
        <div class="bg-white rounded-xl p-5 border border-gray-200">
            <p class="text-3xl font-bold text-green-600"><?= $ativos ?></p>
            <p class="text-sm text-gray-500 mt-1">Ativos no site</p>
        </div>
        <div class="bg-white rounded-xl p-5 border border-gray-200">
            <p class="text-3xl font-bold text-yellow-500"><?= $destaques ?></p>
            <p class="text-sm text-gray-500 mt-1">Em destaque</p>
        </div>
        <div class="bg-white rounded-xl p-5 border border-gray-200">
            <p class="text-3xl font-bold text-gray-400"><?= $inativos ?></p>
            <p class="text-sm text-gray-500 mt-1">Ocultos</p>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- FORMULÁRIO CADASTRO/EDIÇÃO -->
        <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
                <h2 class="text-lg font-bold text-black mb-5 flex items-center gap-2">
                    <?php if ($editando): ?>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Editando Aparelho
                    <?php else: ?>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        Novo Aparelho
                    <?php endif; ?>
                </h2>

                <form method="POST" enctype="multipart/form-data" class="space-y-4">
                    <input type="hidden" name="acao" value="salvar">
                    <input type="hidden" name="id" value="<?= $editando['id'] ?? 0 ?>">
                    <input type="hidden" name="imagem_atual" value="<?= htmlspecialchars($editando['imagem'] ?? '') ?>">

                    <!-- Nome -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Nome do Aparelho *</label>
                        <input type="text" name="nome" required
                            value="<?= htmlspecialchars($editando['nome'] ?? '') ?>"
                            placeholder="Ex: iPhone 15 Pro Max"
                            class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition">
                    </div>

                    <!-- Preço -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Preço *</label>
                        <input type="text" name="preco" required
                            value="<?= htmlspecialchars($editando['preco'] ?? '') ?>"
                            placeholder="Ex: R$ 5.399,00"
                            class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition">
                    </div>

                    <!-- Specs -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Especificações</label>
                        <textarea name="specs" rows="3"
                            placeholder="Ex: Americano | 256GB | Bateria excelente"
                            class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition resize-none"><?= htmlspecialchars($editando['specs'] ?? '') ?></textarea>
                    </div>

                    <!-- Imagem -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Foto do Aparelho</label>
                        <?php if (!empty($editando['imagem'])): ?>
                            <div class="mb-2 p-2 bg-gray-50 rounded-lg flex items-center gap-3">
                                <img src="../<?= htmlspecialchars($editando['imagem']) ?>" class="h-16 w-16 object-cover rounded-lg border">
                                <span class="text-xs text-gray-500">Foto atual<br><span class="text-gray-400">Envie nova para substituir</span></span>
                            </div>
                        <?php endif; ?>
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition cursor-pointer" onclick="document.getElementById('upload-img').click()">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <p class="text-xs text-gray-500">Clique para enviar foto</p>
                            <p class="text-xs text-gray-400">JPG, PNG, WEBP</p>
                        </div>
                        <input type="file" id="upload-img" name="imagem" accept="image/*" class="hidden" onchange="previewImagem(this)">
                        <div id="preview-nova" class="hidden mt-2 p-2 bg-green-50 rounded-lg flex items-center gap-3">
                            <img id="preview-img" class="h-16 w-16 object-cover rounded-lg border">
                            <span class="text-xs text-green-700">Nova foto selecionada</span>
                        </div>
                    </div>

                    <!-- Ordem e Destaque -->
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Ordem</label>
                            <input type="number" name="ordem" min="1"
                                value="<?= $editando['ordem'] ?? (count($aparelhos) + 1) ?>"
                                class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Status</label>
                            <div class="space-y-1 pt-1">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" name="destaque" <?= !empty($editando['destaque']) ? 'checked' : '' ?> class="rounded">
                                    <span class="text-sm text-gray-700">Destaque</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" name="ativo" <?= (!isset($editando) || !empty($editando['ativo'])) ? 'checked' : '' ?> class="rounded">
                                    <span class="text-sm text-gray-700">Ativo</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-2">
                        <button type="submit"
                            class="flex-1 bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition text-sm">
                            <?= $editando ? 'Salvar Alterações' : '+ Cadastrar' ?>
                        </button>
                        <?php if ($editando): ?>
                        <a href="index.php" class="px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition text-sm text-gray-600 font-semibold flex items-center">
                            Cancelar
                        </a>
                        <?php endif; ?>
                    </div>
                </form>
            </div>
        </div>

        <!-- LISTA DE APARELHOS -->
        <div class="lg:col-span-2">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold text-black">Aparelhos Cadastrados</h2>
                <span class="text-sm text-gray-500">Arraste para reordenar</span>
            </div>

            <?php if (empty($aparelhos)): ?>
            <div class="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                <p class="text-gray-400 text-sm">Nenhum aparelho cadastrado ainda.</p>
            </div>
            <?php else: ?>
            <div id="lista-aparelhos" class="space-y-3">
                <?php foreach ($aparelhos as $ap): ?>
                <div class="card-aparelho bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4" data-id="<?= $ap['id'] ?>">
                    <!-- Handle de arrasto -->
                    <div class="drag-handle text-gray-300 hover:text-gray-500 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" /></svg>
                    </div>

                    <!-- Foto -->
                    <div class="flex-shrink-0">
                        <?php if (!empty($ap['imagem'])): ?>
                        <img src="../<?= htmlspecialchars($ap['imagem']) ?>" alt="<?= htmlspecialchars($ap['nome']) ?>"
                            class="h-16 w-16 object-cover rounded-lg border border-gray-200 <?= !$ap['ativo'] ? 'opacity-40' : '' ?>">
                        <?php else: ?>
                        <div class="h-16 w-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <?php endif; ?>
                    </div>

                    <!-- Info -->
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                            <h3 class="font-bold text-sm text-black truncate <?= !$ap['ativo'] ? 'text-gray-400' : '' ?>">
                                <?= htmlspecialchars($ap['nome']) ?>
                            </h3>
                            <?php if ($ap['destaque']): ?>
                            <span class="badge-destaque text-white text-xs px-2 py-0.5 rounded-full font-semibold">⭐ Destaque</span>
                            <?php endif; ?>
                            <?php if (!$ap['ativo']): ?>
                            <span class="badge-inativo text-white text-xs px-2 py-0.5 rounded-full font-semibold">Oculto</span>
                            <?php endif; ?>
                        </div>
                        <p class="text-green-600 font-bold text-sm mt-0.5"><?= htmlspecialchars($ap['preco']) ?></p>
                        <?php if (!empty($ap['specs'])): ?>
                        <p class="text-gray-400 text-xs mt-0.5 truncate"><?= htmlspecialchars($ap['specs']) ?></p>
                        <?php endif; ?>
                    </div>

                    <!-- Ações -->
                    <div class="flex items-center gap-1 flex-shrink-0">
                        <!-- Toggle ativo -->
                        <form method="POST" class="inline">
                            <input type="hidden" name="acao" value="toggle_ativo">
                            <input type="hidden" name="id" value="<?= $ap['id'] ?>">
                            <button type="submit" title="<?= $ap['ativo'] ? 'Ocultar' : 'Ativar' ?>"
                                class="p-2 rounded-lg <?= $ap['ativo'] ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100' ?> transition">
                                <?php if ($ap['ativo']): ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                <?php else: ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                <?php endif; ?>
                            </button>
                        </form>

                        <!-- Editar -->
                        <a href="?editar=<?= $ap['id'] ?>" title="Editar"
                            class="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </a>

                        <!-- Excluir -->
                        <form method="POST" class="inline" onsubmit="return confirm('Excluir \'<?= htmlspecialchars(addslashes($ap['nome'])) ?>\'? Esta ação não pode ser desfeita.')">
                            <input type="hidden" name="acao" value="excluir">
                            <input type="hidden" name="id" value="<?= $ap['id'] ?>">
                            <button type="submit" title="Excluir"
                                class="p-2 rounded-lg text-red-400 hover:bg-red-50 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </form>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<!-- SortableJS para drag & drop -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
<script>
// Preview de imagem
function previewImagem(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            document.getElementById('preview-img').src = e.target.result;
            document.getElementById('preview-nova').classList.remove('hidden');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Drag & Drop para reordenar
const lista = document.getElementById('lista-aparelhos');
if (lista) {
    Sortable.create(lista, {
        handle: '.drag-handle',
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: function() {
            const ids = [...lista.querySelectorAll('[data-id]')].map(el => parseInt(el.dataset.id));
            fetch('index.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'acao=reordenar&ids_ordem=' + encodeURIComponent(JSON.stringify(ids))
            });
        }
    });
}
</script>
</body>
</html>
