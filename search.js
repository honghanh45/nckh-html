// Hàm chuẩn hóa chuỗi tiếng Việt (loại bỏ dấu)
function normalizeVietnameseText(text) {
    return text
        .normalize('NFD') // Phân tách ký tự và dấu
        .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu
        .replace(/đ/g, 'd') // Thay 'đ' thành 'd'
        .replace(/Đ/g, 'D')
        .toLowerCase();
}

// Danh sách từ khóa phổ biến với URL đích (đồng bộ với tên file thực tế trong thư mục)
const popularKeywords = [
    { keyword: 'hướng dẫn khách hàng', url: '#' },
    { keyword: 'giờ làm việc', url: 'TIME.html' },
    { keyword: 'đặt lịch khám', url: 'KHACH.html' },
    { keyword: 'bảng giá dịch vụ', url: 'banggia.html' },
    { keyword: 'bản đồ', url: '#' },
    { keyword: 'khám sức khỏe tiền hôn nhân', url: 'KSK-HONNHAN.html' },
    { keyword: 'video sức khỏe', url: '#' },
    { keyword: 'hệ thống medlatec', url: '#' },
    { keyword: 'đội ngũ chuyên gia', url: '#' },
    { keyword: 'khám bệnh tại nhà', url: 'BENHNEN.html' },
    { keyword: 'gói khám sức khỏe', url: 'KHAMSUCKHOE.html' },
    { keyword: 'khám sức khỏe cá nhân', url: 'KSK-LAIXE.html' },
    { keyword: 'khám sức khỏe xin việc', url: 'KSK-XINVIEC.html' },
    { keyword: 'khám sức khỏe cao tuổi', url: 'KSK-CAOTUOI.html' },
    { keyword: 'khám sức khỏe việt ngoại ', url: 'KSK-VIETNGOAI.html' },
    { keyword: 'dịch vụ y tế', url: 'DICHVUYTE.html' },
    { keyword: 'chuyên khoa y tế', url: 'CHUYENKHOAYTE.html' },
    { keyword: 'khám sức khỏe doanh nghiệp  ', url: 'KSK-DN.html' },
    { keyword: 'bệnh nền ', url: '#' },
    { keyword: 'bệnh viện Phương Đông ', url: '#' },
    { keyword: 'bệnh viện 5 sao Hà Nội', url: '#' },
    { keyword: 'khám sức khỏe thai sản', url: 'THAISAN.htmlhtml' }
];

// Hàm tìm kiếm và trả về kết quả khớp trong thanh điều hướng
function findMatchesInNav(searchInputValue) {
    const normalizedSearchInput = normalizeVietnameseText(searchInputValue);
    const navLinks = document.querySelectorAll('nav a, .dropdown-content a');
    const matches = [];

    // Tách từ khóa thành các từ riêng lẻ để tìm kiếm nâng cao
    const searchTerms = normalizedSearchInput.split(/\s+/);

    // Duyệt qua từng mục để tìm kiếm
    for (const link of navLinks) {
        const linkText = link.textContent.trim();
        const normalizedLinkText = normalizeVietnameseText(linkText);
        const keywords = link.getAttribute('data-keywords') 
            ? normalizeVietnameseText(link.getAttribute('data-keywords')).split(/\s+/) 
            : [];
        const href = link.getAttribute('href');

        // Kiểm tra xem có từ khóa nào khớp với linkText hoặc keywords không
        let isMatch = false;
        for (const term of searchTerms) {
            if (normalizedLinkText.includes(term) || keywords.some(keyword => keyword.includes(term))) {
                isMatch = true;
                break;
            }
        }

        if (isMatch) {
            matches.push({ text: linkText, href, element: link });
        }
    }

    return matches;
}

// Hàm tìm kiếm gợi ý từ danh sách từ khóa phổ biến
function findSuggestions(inputValue) {
    const normalizedInput = normalizeVietnameseText(inputValue);
    if (!normalizedInput) return [];

    // Tìm kiếm trong danh sách từ khóa phổ biến
    return popularKeywords
        .filter(item => normalizeVietnameseText(item.keyword).includes(normalizedInput))
        .slice(0, 8); // Giới hạn tối đa 8 gợi ý
}

// Hàm hiển thị kết quả tìm kiếm trực tiếp trên trang
function displaySearchResults(query) {
    const searchResultsList = document.getElementById('searchResultsList');
    const searchResult = document.getElementById('searchResult');

    if (!query) {
        searchResultsList.style.display = 'none';
        searchResult.innerHTML = ''; // Xóa gợi ý
        return;
    }

    // Hiển thị kết quả tìm kiếm
    searchResultsList.style.display = 'block';

    const matches = findMatchesInNav(query);

    if (matches.length === 0) {
        searchResultsList.innerHTML = `<p>Không tìm thấy nội dung phù hợp cho: "${query}"</p>`;
    } else {
        searchResultsList.innerHTML = `<p>Tìm thấy ${matches.length} kết quả cho: "${query}"</p>`;
        const list = document.createElement('ul');
        list.style.listStyle = 'none';
        list.style.padding = '0';

        matches.forEach(match => {
            const listItem = document.createElement('li');
            listItem.style.margin = '10px 0';

            if (match.href === '#' || !match.href) {
                const dropdownContent = match.element.closest('.dropdown')?.querySelector('.dropdown-content');
                if (dropdownContent) {
                    const dropdownLinks = dropdownContent.querySelectorAll('a');
                    if (dropdownLinks.length > 0) {
                        listItem.innerHTML = `<span>${match.text}:</span>`;
                        const subList = document.createElement('ul');
                        subList.style.listStyle = 'none';
                        subList.style.paddingLeft = '20px';

                        dropdownLinks.forEach(link => {
                            const linkText = link.textContent.trim();
                            const linkHref = link.getAttribute('href');
                            const subListItem = document.createElement('li');
                            subListItem.style.margin = '5px 0';

                            const linkElement = document.createElement('a');
                            linkElement.href = linkHref;
                            linkElement.textContent = linkText;
                            linkElement.style.color = '#007bff';
                            linkElement.style.textDecoration = 'none';
                            linkElement.addEventListener('click', (e) => {
                                e.preventDefault();
                                searchResult.textContent = `Đang chuyển hướng đến: "${linkText}"...`;
                                searchResult.style.transition = 'opacity 1s ease-out';
                                searchResult.style.opacity = '1';

                                setTimeout(() => {
                                    searchResult.style.opacity = '0';
                                }, 1000);

                                setTimeout(() => {
                                    window.location.href = linkHref;
                                }, 1000);
                            });
                            subListItem.appendChild(linkElement);
                            subList.appendChild(subListItem);
                        });

                        listItem.appendChild(subList);
                    } else {
                        listItem.textContent = `${match.text} (Chưa có liên kết)`;
                    }
                } else {
                    listItem.textContent = `${match.text} (Chưa có liên kết)`;
                }
            } else {
                const link = document.createElement('a');
                link.href = match.href;
                link.textContent = match.text;
                link.style.color = '#007bff';
                link.style.textDecoration = 'none';
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    searchResult.textContent = `Đang chuyển hướng đến: "${match.text}"...`;
                    searchResult.style.transition = 'opacity 1s ease-out';
                    searchResult.style.opacity = '1';

                    setTimeout(() => {
                        searchResult.style.opacity = '0';
                    }, 1000);

                    setTimeout(() => {
                        window.location.href = match.href;
                    }, 1000);
                });
                listItem.appendChild(link);
            }
            list.appendChild(listItem);
        });

        searchResultsList.appendChild(list);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResult = document.getElementById('searchResult');

    // Kiểm tra xem phần tử có tồn tại không
    if (!searchForm || !searchInput || !searchResult) {
        console.error('Phần tử searchForm, searchInput hoặc searchResult không tồn tại trong DOM');
        return;
    }

    // Tạo container cho gợi ý và saved info
    const suggestionList = document.createElement('ul');
    suggestionList.id = 'suggestionList';
    suggestionList.style.display = 'none'; // Ẩn mặc định
    searchResult.appendChild(suggestionList);

    const savedInfoList = document.createElement('ul');
    savedInfoList.id = 'savedInfoList';
    savedInfoList.style.display = 'none'; // Ẩn mặc định
    searchResult.appendChild(savedInfoList);

    // Lấy lịch sử tìm kiếm từ localStorage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Biến để theo dõi gợi ý được chọn bằng phím mũi tên
    let selectedSuggestionIndex = -1;

    // Hàm hiển thị lịch sử tìm kiếm
    function showSearchHistory() {
        savedInfoList.innerHTML = ''; // Xóa nội dung cũ
        if (searchHistory.length === 0) {
            savedInfoList.style.display = 'none';
            return;
        }

        // Thêm tiêu đề "Saved info"
        const header = document.createElement('li');
        header.textContent = 'Saved info';
        header.style.padding = '8px 12px';
        header.style.fontWeight = 'bold';
        header.style.backgroundColor = '#f5f5f5';
        savedInfoList.appendChild(header);

        // Hiển thị các mục trong lịch sử
        searchHistory.forEach((query, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'saved-info-item';
            listItem.style.padding = '8px 12px';
            listItem.style.cursor = 'pointer';
            listItem.style.display = 'flex';
            listItem.style.justifyContent = 'space-between';
            listItem.style.alignItems = 'center';

            // Thêm nội dung từ khóa
            const textSpan = document.createElement('span');
            textSpan.textContent = query;
            listItem.appendChild(textSpan);

            // Thêm nút xóa (X)
            const deleteButton = document.createElement('span');
            deleteButton.textContent = 'X';
            deleteButton.className = 'delete-saved-info';
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.color = '#666';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Ngăn sự kiện click lan lên listItem
                searchHistory.splice(index, 1); // Xóa mục khỏi lịch sử
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                showSearchHistory(); // Cập nhật lại danh sách
            });
            listItem.appendChild(deleteButton);

            // Sự kiện click vào mục trong lịch sử
            listItem.addEventListener('click', () => {
                savedInfoList.style.display = 'none';
                suggestionList.style.display = 'none';
                searchInput.value = query;
                displaySearchResults(query);
            });

            savedInfoList.appendChild(listItem);
        });

        savedInfoList.style.display = 'block';
    }

    // Hàm hiển thị gợi ý tìm kiếm
    function showSuggestions(inputValue) {
        suggestionList.innerHTML = ''; // Xóa gợi ý cũ
        savedInfoList.style.display = 'none'; // Ẩn danh sách saved info

        if (inputValue === '') {
            suggestionList.style.display = 'none';
            searchResult.innerHTML = ''; // Xóa kết quả tìm kiếm
            showSearchHistory();
            return;
        }

        // Tìm kiếm gợi ý từ danh sách từ khóa phổ biến
        const suggestions = findSuggestions(inputValue);

        // Hiển thị gợi ý
        if (suggestions.length > 0) {
            suggestionList.style.display = 'block';
            selectedSuggestionIndex = -1; // Reset chỉ số gợi ý được chọn

            suggestions.forEach((suggestion, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'suggestion-item';
                listItem.style.padding = '8px 12px';
                listItem.style.cursor = 'pointer';
                listItem.style.display = 'flex';
                listItem.style.alignItems = 'center';

                // Thêm biểu tượng kính lúp SVG
                const iconSpan = document.createElement('span');
                iconSpan.className = 'search-icon';
                iconSpan.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                `;
                listItem.appendChild(iconSpan);

                // Thêm nội dung gợi ý
                const textSpan = document.createElement('span');
                textSpan.textContent = suggestion.keyword;
                listItem.appendChild(textSpan);

                // Sự kiện click vào gợi ý
                listItem.addEventListener('click', () => {
                    searchInput.value = suggestion.keyword;
                    suggestionList.style.display = 'none';
                    // Nếu gợi ý có URL cụ thể, chuyển hướng
                    if (suggestion.url && suggestion.url !== '#') {
                        window.location.href = suggestion.url;
                    } else {
                        // Nếu không có URL cụ thể, hiển thị kết quả tìm kiếm trên trang
                        displaySearchResults(suggestion.keyword);
                    }
                });

                // Thêm class khi gợi ý được chọn bằng phím mũi tên
                listItem.addEventListener('mouseover', () => {
                    selectedSuggestionIndex = index;
                    updateSelectedSuggestion();
                });

                suggestionList.appendChild(listItem);
            });

            // Thêm dòng "Báo cáo đề xuất tìm kiếm không phù hợp"
            const reportItem = document.createElement('li');
            reportItem.className = 'report-suggestion';
            reportItem.style.padding = '8px 12px';
            reportItem.style.fontSize = '12px';
            reportItem.style.color = '#666';
            reportItem.style.borderTop = '1px solid #ddd';
            reportItem.style.textAlign = 'center';
            reportItem.innerHTML = 'Báo cáo đề xuất tìm kiếm không phù hợp';
            reportItem.addEventListener('click', () => {
                alert('Chức năng báo cáo chưa được triển khai!');
            });
            suggestionList.appendChild(reportItem);
        } else {
            suggestionList.style.display = 'none';
        }
    }

    // Hàm cập nhật gợi ý được chọn bằng phím mũi tên
    function updateSelectedSuggestion() {
        const suggestionItems = suggestionList.querySelectorAll('.suggestion-item');
        suggestionItems.forEach((item, index) => {
            if (index === selectedSuggestionIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
                searchInput.value = item.querySelector('span:nth-child(2)').textContent;
            } else {
                item.classList.remove('selected');
            }
        });
    }

    // Sự kiện focus: Hiển thị lịch sử tìm kiếm khi nhấp vào thanh tìm kiếm
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim() === '') {
            showSearchHistory();
        }
    });

    // Sự kiện input: Hiển thị gợi ý khi gõ
    searchInput.addEventListener('input', function() {
        const inputValue = searchInput.value.trim();
        showSuggestions(inputValue);
    });

    // Sự kiện keydown: Hỗ trợ phím mũi tên để chọn gợi ý
    searchInput.addEventListener('keydown', (e) => {
        const suggestionItems = suggestionList.querySelectorAll('.suggestion-item');
        if (suggestionItems.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestionItems.length - 1);
            updateSelectedSuggestion();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
            if (selectedSuggestionIndex === -1) {
                searchInput.value = searchInput.value; // Giữ giá trị gốc khi không có gợi ý được chọn
            }
            updateSelectedSuggestion();
        } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
            e.preventDefault();
            const selectedSuggestion = suggestionItems[selectedSuggestionIndex].querySelector('span:nth-child(2)').textContent;
            const suggestionObject = suggestions.find(s => s.keyword === selectedSuggestion);
            searchInput.value = selectedSuggestion;
            suggestionList.style.display = 'none';
            // Nếu gợi ý có URL cụ thể, chuyển hướng
            if (suggestionObject.url && suggestionObject.url !== '#') {
                window.location.href = suggestionObject.url;
            } else {

                // Nếu không có URL cụ thể, hiển thị kết quả tìm kiếm trên trang
                displaySearchResults(selectedSuggestion);
            }
        }
    });

    // Sự kiện submit: Tìm kiếm khi nhấn Enter
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn form submit mặc định

        const searchInputValue = searchInput.value.trim();
        if (searchInputValue === '') return;

        // Lưu từ khóa vào lịch sử
        if (!searchHistory.includes(searchInputValue)) {
            searchHistory.unshift(searchInputValue);
            if (searchHistory.length > 5) {
                searchHistory.pop();
            }
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }

        // Hiển thị kết quả tìm kiếm trên trang
        displaySearchResults(searchInputValue);
    });

    // Hiển thị kết quả tìm kiếm khi trang tải (dựa trên query parameter)
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        searchInput.value = query;
        displaySearchResults(query);
    }
});  