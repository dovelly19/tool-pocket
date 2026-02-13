// ============================================
// ToolPocket - 共通スクリプト
// ============================================

const TOOLS = [
    { id: 'moji-kaunto', icon: '📝', name: '文字数カウント', desc: '文字数・単語数・行数をリアルタイムで計算' },
    { id: 'wareki-seireki', icon: '📅', name: '和暦⇔西暦変換', desc: '令和・平成・昭和を西暦にかんたん変換' },
    { id: 'nenrei-keisan', icon: '🎂', name: '年齢計算', desc: '生年月日から現在の年齢を計算' },
    { id: 'nissuu-keisan', icon: '⏱️', name: '日数計算', desc: '2つの日付間の日数を計算' },
    { id: 'password', icon: '🔑', name: 'パスワード生成', desc: '安全なランダムパスワードを自動生成' },
    { id: 'qr-code', icon: '📱', name: 'QRコード生成', desc: 'テキストやURLからQRコードを作成' },
    { id: 'warikan', icon: '💰', name: '割り勘計算', desc: '飲み会や食事の割り勘をかんたん計算' },
    { id: 'bmi', icon: '⚖️', name: 'BMI計算', desc: '身長と体重からBMIを算出' },
    { id: 'zenkaku-hankaku', icon: '🔄', name: '全角⇔半角変換', desc: '全角・半角文字を一括変換' },
    { id: 'color-code', icon: '🎨', name: 'カラーコード変換', desc: 'HEX・RGB・HSLを相互変換' },
];

// Render header
function renderHeader() {
    const currentPath = window.location.pathname;
    const isHome = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath === '';
    const basePath = isHome ? '.' : '..';

    document.getElementById('site-header').innerHTML = `
        <div class="header-inner">
            <a href="${basePath}/" class="site-logo">🧰 Tool<span>Pocket</span></a>
            <nav class="header-nav">
                <a href="${basePath}/">ツール一覧</a>
            </nav>
        </div>
    `;
}

// Render footer with related tools
function renderFooter() {
    const currentPath = window.location.pathname;
    const isHome = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath === '';
    const basePath = isHome ? '.' : '..';

    document.getElementById('site-footer').innerHTML = `
        <div class="footer-inner">
            <div class="footer-links">
                <a href="${basePath}/">🧰 全ツール一覧</a>
                <a href="${basePath}/privacy/">📜 プライバシーポリシー</a>
            </div>
            <p>© ${new Date().getFullYear()} ToolPocket. すべてのツールは無料でご利用いただけます。</p>
            <p style="margin-top:8px;font-size:11px;">すべての処理はブラウザ内で完結します。データがサーバーに送信されることはありません。</p>
        </div>
    `;
}

// Render related tools (exclude current)
function renderRelatedTools(currentId) {
    const container = document.getElementById('related-tools');
    if (!container) return;

    const currentPath = window.location.pathname;
    const basePath = '..';
    const related = TOOLS.filter(t => t.id !== currentId).slice(0, 4);

    container.innerHTML = `
        <h2>🔧 その他の便利ツール</h2>
        <div class="related-grid">
            ${related.map(t => `
                <a href="${basePath}/${t.id}/" class="related-card">
                    <span class="r-icon">${t.icon}</span>
                    <span class="r-name">${t.name}</span>
                </a>
            `).join('')}
        </div>
    `;
}

// Copy to clipboard
function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = '✅ コピーしました！';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Show toast notification
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Amazon Associates
const ASSOCIATE_TAG = 'toolpocket-22';
const AFFILIATE_LINKS = {
    'moji-kaunto': [
        { name: 'キーボード', keyword: 'メカニカルキーボード', emoji: '⌨️' },
        { name: 'ライティング本', keyword: 'ライティング 文章術', emoji: '📖' },
        { name: 'ノートPC', keyword: 'ノートパソコン 軽量', emoji: '💻' },
    ],
    'wareki-seireki': [
        { name: '手帳・ダイアリー', keyword: '手帳 2025', emoji: '📓' },
        { name: 'カレンダー', keyword: '卓上カレンダー', emoji: '📅' },
        { name: '万年筆', keyword: '万年筆 初心者', emoji: '🖊️' },
    ],
    'nenrei-keisan': [
        { name: 'プレゼント', keyword: '誕生日プレゼント', emoji: '🎁' },
        { name: 'アンチエイジング', keyword: 'アンチエイジング スキンケア', emoji: '✨' },
        { name: 'サプリメント', keyword: 'マルチビタミン サプリ', emoji: '💊' },
    ],
    'nissuu-keisan': [
        { name: 'スケジュール手帳', keyword: '手帳 スケジュール', emoji: '📒' },
        { name: 'タイマー', keyword: 'キッチンタイマー', emoji: '⏰' },
        { name: 'プロジェクト管理本', keyword: 'プロジェクト管理 入門', emoji: '📘' },
    ],
    'password': [
        { name: 'セキュリティキー', keyword: 'YubiKey セキュリティキー', emoji: '🔐' },
        { name: 'パスワード管理', keyword: 'パスワード管理 本', emoji: '📕' },
        { name: 'VPNルーター', keyword: 'VPN ルーター', emoji: '🌐' },
    ],
    'qr-code': [
        { name: 'スマホスタンド', keyword: 'スマホスタンド', emoji: '📱' },
        { name: 'ラベルプリンター', keyword: 'ラベルプリンター', emoji: '🖨️' },
        { name: '名刺用紙', keyword: '名刺 用紙 印刷', emoji: '💼' },
    ],
    'warikan': [
        { name: 'キャッシュレス決済', keyword: 'スマホ決済 本', emoji: '💳' },
        { name: '家計簿', keyword: '家計簿 ノート', emoji: '📊' },
        { name: 'お金の本', keyword: 'お金 貯め方 本', emoji: '💰' },
    ],
    'bmi': [
        { name: '体重計', keyword: '体組成計 スマホ連動', emoji: '⚖️' },
        { name: 'フィットネス', keyword: 'ヨガマット', emoji: '🏋️' },
        { name: 'プロテイン', keyword: 'プロテイン ホエイ', emoji: '🥤' },
    ],
    'zenkaku-hankaku': [
        { name: 'キーボード', keyword: '日本語キーボード', emoji: '⌨️' },
        { name: 'プログラミング本', keyword: 'JavaScript 入門', emoji: '📗' },
        { name: 'モニター', keyword: 'PCモニター 4K', emoji: '🖥️' },
    ],
    'color-code': [
        { name: 'デザイン本', keyword: '配色デザイン 本', emoji: '🎨' },
        { name: 'カラーチャート', keyword: 'カラーチャート 色見本', emoji: '🖌️' },
        { name: 'ペンタブ', keyword: 'ペンタブレット', emoji: '✏️' },
    ],
};

function renderAffiliateLinks(toolId) {
    const container = document.getElementById('affiliate-links');
    if (!container || !AFFILIATE_LINKS[toolId]) return;

    const links = AFFILIATE_LINKS[toolId];
    const amazonBase = `https://www.amazon.co.jp/s?tag=${ASSOCIATE_TAG}&k=`;

    container.innerHTML = `
        <h2>📦 関連するおすすめ商品</h2>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">※ 広告リンクを含みます</p>
        <div class="related-grid">
            ${links.map(l => `
                <a href="${amazonBase}${encodeURIComponent(l.keyword)}" target="_blank" rel="noopener" class="related-card" style="text-decoration:none;">
                    <span class="r-icon">${l.emoji}</span>
                    <span class="r-name">${l.name}</span>
                </a>
            `).join('')}
        </div>
    `;
}

// Init common elements
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
});
