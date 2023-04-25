import{_ as n,W as s,X as i,a1 as a}from"./framework-b6a07282.js";const l={},t=a(`<h2 id="敏感信息收集" tabindex="-1"><a class="header-anchor" href="#敏感信息收集" aria-hidden="true">#</a> 敏感信息收集</h2><ul><li>内网的核心敏感数据，不仅包括数据库、电子邮件，还包括个人数据及组织的业务数据、技术数据等。可以说，价值较高的数据基本都在内网中。</li></ul><h3 id="敏感数据定位" tabindex="-1"><a class="header-anchor" href="#敏感数据定位" aria-hidden="true">#</a> 敏感数据定位</h3><ol><li>定位内部人事组织结构</li><li>在内部人事组织结构中寻找需要监视的人员</li><li>定位相关人员的机器</li><li>相关人员存放文档的位置</li><li>列出存放文档的服务器的目录</li></ol><h4 id="重点核心业务机器" tabindex="-1"><a class="header-anchor" href="#重点核心业务机器" aria-hidden="true">#</a> 重点核心业务机器</h4><ol><li>高级管理人员 系统管理人员 财务/人事/业务人员的个人计算机</li><li>产品管理系统服务器</li><li>办公系统服务器</li><li>财务应用系统服务器 核心产品源码服务器（SVN/GIT服务器）</li><li>数据库服务器</li><li>文件服务器</li><li>共享服务器</li><li>电子邮件服务器</li><li>网站监控系统服务器</li><li>信息安全监控服务器</li><li>生产工厂服务器</li></ol><h4 id="敏感信息和敏感文件" tabindex="-1"><a class="header-anchor" href="#敏感信息和敏感文件" aria-hidden="true">#</a> 敏感信息和敏感文件</h4><ol><li>站点源码备份文件</li><li>数据库备份文件等等</li><li>浏览器保存的密码和游览器的cookie</li><li>其他用户会话</li><li>3389和ipc$连接记录</li><li>回收站中的信息等等</li><li>Windows的无线密码</li><li>网络内部的各种账号密码， 包含电子邮箱，V**，FTP等等</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.指定目录下搜集各类敏感文件
<span class="token function">dir</span> /a /s /b d:<span class="token punctuation">\\</span>&quot;*.txt<span class="token string">&quot;
dir /a /s /b C:<span class="token entity" title="\\&quot;">\\&quot;</span>*.xlsx&quot;</span>
<span class="token function">dir</span> /a /s /b d:<span class="token punctuation">\\</span>&quot;*.md<span class="token string">&quot;
dir /a /s /b d:<span class="token entity" title="\\&quot;">\\&quot;</span>*.sql&quot;</span>
<span class="token function">dir</span> /a /s /b d:<span class="token punctuation">\\</span>&quot;*.pdf<span class="token string">&quot;
dir /a /s /b d:<span class="token entity" title="\\&quot;">\\&quot;</span>*.docx&quot;</span>
<span class="token function">dir</span> /a /s /b d:<span class="token punctuation">\\</span>&quot;*.doc<span class="token string">&quot;
dir /a /s /b d:<span class="token entity" title="\\&quot;">\\&quot;</span>*conf*&quot;</span>
<span class="token function">dir</span> /a /s /b d:<span class="token punctuation">\\</span>&quot;*bak*<span class="token string">&quot;
dir /a /s /b d:<span class="token entity" title="\\&quot;">\\&quot;</span>*pwd*&quot;</span>
<span class="token function">dir</span> /a /s /b d:<span class="token punctuation">\\</span>&quot;*pass*<span class="token string">&quot;
dir /a /s /b d:<span class="token entity" title="\\&quot;">\\&quot;</span>*login*&quot;</span>
<span class="token function">dir</span> /a /s /b d:<span class="token punctuation">\\</span>&quot;*user*&quot;
<span class="token number">2</span>.指定目录下的文件中搜集各种账号密码
findstr /si pass *.inc *.config *.ini *.txt *.asp *.aspx *.php *.jsp *.xml *.cgi *.bak
findstr /si userpwd *.inc *.config *.ini *.txt *.asp *.aspx *.php *.jsp *.xml *.cgi *.bak
findstr /si <span class="token builtin class-name">pwd</span> *.inc *.config *.ini *.txt *.asp *.aspx *.php *.jsp *.xml *.cgi *.bak
findstr /si login *.inc *.config *.ini *.txt *.asp *.aspx *.php *.jsp *.xml *.cgi *.bak
findstr /si user *.inc *.config *.ini *.txt *.asp *.aspx *.php *.jsp *.xml *.cgi *.bak
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),e=[t];function o(d,c){return s(),i("div",null,e)}const u=n(l,[["render",o],["__file","敏感信息收集.html.vue"]]);export{u as default};
