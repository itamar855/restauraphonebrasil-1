<?php
session_start();

// =============================================
// CONFIGURAÇÕES DE ACESSO - ALTERE AQUI
// =============================================
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'restaura2025'); // Troque por uma senha forte!
// =============================================

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = trim($_POST['usuario'] ?? '');
    $pass = trim($_POST['senha'] ?? '');

    if ($user === ADMIN_USER && $pass === ADMIN_PASS) {
        $_SESSION['admin_logado'] = true;
        $_SESSION['admin_user'] = $user;
        header('Location: index.php');
        exit;
    } else {
        $erro = 'Usuário ou senha incorretos.';
    }
}

// Se já logado, redireciona
if (!empty($_SESSION['admin_logado'])) {
    header('Location: index.php');
    exit;
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
        body { background: #0f0f0f; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
            <img src="../imagens/LOGO.png" alt="Logo" class="h-16 mx-auto mb-3">
            <h1 class="text-white text-2xl font-bold">Painel Administrativo</h1>
            <p class="text-gray-400 text-sm mt-1">Restaura Phone Brasil</p>
        </div>

        <!-- Card de login -->
        <div class="bg-white rounded-2xl shadow-2xl p-8">
            <?php if (!empty($erro)): ?>
                <div class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <?= htmlspecialchars($erro) ?>
                </div>
            <?php endif; ?>

            <form method="POST" class="space-y-5">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Usuário</label>
                    <input type="text" name="usuario" required autofocus
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                        placeholder="Digite seu usuário">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                    <div class="relative">
                        <input type="password" name="senha" id="campo-senha" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                            placeholder="Digite sua senha">
                        <button type="button" onclick="toggleSenha()" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                            <svg id="icon-eye" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                    </div>
                </div>
                <button type="submit"
                    class="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg">
                    Entrar no Painel
                </button>
            </form>

            <p class="text-center text-xs text-gray-400 mt-6">
                Acesso restrito. <a href="../index.php" class="text-black hover:underline">← Voltar ao site</a>
            </p>
        </div>
    </div>

    <script>
        function toggleSenha() {
            const campo = document.getElementById('campo-senha');
            campo.type = campo.type === 'password' ? 'text' : 'password';
        }
    </script>
</body>
</html>
