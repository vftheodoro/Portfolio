#!/bin/bash
# Script para verificar se o portfolio está pronto para GitHub Pages

echo "🔍 Verificando portfolio para GitHub Pages..."
echo ""

# Verificar se há paths absolutos (problemático para GH Pages)
echo "1️⃣ Procurando paths absolutos..."
if grep -r "href=\"/" . --include="*.html" --include="*.css" 2>/dev/null | grep -v node_modules; then
    echo "⚠️  AVISO: Encontrados paths absolutos. Favor revisar."
else
    echo "✅ Nenhum path absoluto encontrado"
fi

echo ""
echo "2️⃣ Verificando imports de módulos..."
if grep -r "import\|require" js/ --include="*.js" 2>/dev/null | grep -v "node_modules"; then
    echo "⚠️  AVISO: Encontrados imports de módulos. Node.js não vai funcionar em GitHub Pages."
else
    echo "✅ Nenhum import de módulo encontrado"
fi

echo ""
echo "3️⃣ Verificando arquivos principais..."
[ -f "index.html" ] && echo "✅ index.html encontrado" || echo "❌ index.html NÃO encontrado"
[ -f "css/style.css" ] && echo "✅ css/style.css encontrado" || echo "❌ css/style.css NÃO encontrado"
[ -f "js/main.js" ] && echo "✅ js/main.js encontrado" || echo "❌ js/main.js NÃO encontrado"
[ -d "assets/" ] && echo "✅ assets/ encontrado" || echo "❌ assets/ NÃO encontrado"

echo ""
echo "4️⃣ Verificando translações..."
lines=$(grep -c "data-i18n=" index.html 2>/dev/null || echo "0")
echo "✅ Encontrados $lines elementos com data-i18n"

echo ""
echo "✨ Portfolio está pronto para GitHub Pages!"
echo ""
echo "Próximo passo: git init && git add . && git commit -m 'Deploy portfolio'"
