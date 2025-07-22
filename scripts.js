document.addEventListener('DOMContentLoaded', function() {
    const headerDestaque = document.getElementById('header-destaque');
    const destaqueHeaderContainer = document.getElementById('destaque-header-container');
    const produtosContainer = document.getElementById('produtos-container');
    
    // Carrega dados do localStorage
    const produtos = JSON.parse(localStorage.getItem('produtosMaeIA') || '[]');
    const destaquePrincipal = JSON.parse(localStorage.getItem('destaquePrincipalMaeIA') || null);
    
    // Exibe o produto em destaque no cabeçalho
    if (destaquePrincipal && destaquePrincipal.produto) {
        const produto = destaquePrincipal.produto;
        
        // Define a imagem do produto como fundo do cabeçalho
        headerDestaque.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${produto.imagem}')`;
        
        // Adiciona o produto em destaque no cabeçalho
        destaqueHeaderContainer.innerHTML = `
            <div class="destaque-header">
                <div class="destaque-header-img">
                    <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                </div>
                <div class="destaque-header-info">
                    <span class="destaque-header-tag">OFERTA DO DIA</span>
                    <h2 class="destaque-header-title">${produto.nome}</h2>
                    ${produto.preco ? `<div class="destaque-header-price">R$ ${produto.preco}</div>` : ''}
                    <a href="${produto.link}" target="_blank" class="btn-comprar" rel="noopener noreferrer">COMPRAR AGORA</a>
                </div>
            </div>
        `;
    } else {
        // Se não houver destaque, mostra cabeçalho padrão
        headerDestaque.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://img.freepik.com/fotos-premium/assistente-moderno-de-inteligencia-artificial-nos-negocios-um-otimo-design-para-todos-os-fins_155807-8460.jpg')`;
        destaqueHeaderContainer.innerHTML = '';
    }
    
    // Exibe a lista de produtos
    if (produtos.length > 0) {
        produtosContainer.innerHTML = produtos.map(produto => `
            <article class="produto-card">
                ${produto.destaque ? '<span class="produto-oferta">OFERTA</span>' : ''}
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                <h3>${produto.nome}</h3>
                <div class="produto-preco">${produto.preco ? 'R$ ' + produto.preco : 'Consultar preço'}</div>
                <a href="${produto.link}" target="_blank" class="btn-comprar" rel="noopener noreferrer">Comprar</a>
            </article>
        `).join('');
    } else {
        produtosContainer.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#666">Em breve novas recomendações para você!</p>';
    }
});