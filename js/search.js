// 搜索功能实现
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

if (searchInput && searchResults) {
    // 加载搜索数据
    let searchData = [];
    
    // 尝试加载search.xml文件
    fetch('/search.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            
            // 检查是否有解析错误
            const parserError = xmlDoc.getElementsByTagName('parsererror');
            if (parserError.length > 0) {
                console.error('XML解析错误:', parserError[0].textContent);
                return;
            }
            
            const items = xmlDoc.getElementsByTagName('entry');
            console.log('找到的文章数量:', items.length);
            
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                try {
                    const title = item.getElementsByTagName('title')[0].textContent;
                    const link = item.getElementsByTagName('url')[0].textContent;
                    const contentElement = item.getElementsByTagName('content')[0];
                    const content = contentElement ? contentElement.textContent : '';
                    
                    searchData.push({
                        title,
                        link,
                        content: content.replace(/<[^>]*>/g, '') // 去除HTML标签
                    });
                } catch (error) {
                    console.error('处理文章时出错:', error);
                }
            }
            console.log('搜索数据加载完成，共', searchData.length, '篇文章');
        })
        .catch(error => {
            console.error('加载search.xml失败:', error);
        });
    
    // 搜索功能
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        
        if (query) {
            console.log('搜索关键词:', query);
            console.log('当前搜索数据数量:', searchData.length);
            
            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.content.toLowerCase().includes(query)
            );
            
            console.log('搜索结果数量:', results.length);
            
            if (results.length > 0) {
                results.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.innerHTML = `<a href="${result.link}">${result.title}</a>`;
                    searchResults.appendChild(resultItem);
                });
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="search-no-result">没有找到相关文章</div>';
                searchResults.style.display = 'block';
            }
        } else {
            searchResults.style.display = 'none';
        }
    });
    
    // 点击页面其他地方关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}