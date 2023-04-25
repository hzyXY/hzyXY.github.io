import{_ as e,W as n,X as a,a1 as s}from"./framework-b6a07282.js";const i={},d=s(`<h2 id="域内基础信息收集" tabindex="-1"><a class="header-anchor" href="#域内基础信息收集" aria-hidden="true">#</a> 域内基础信息收集</h2><h4 id="查询权限" tabindex="-1"><a class="header-anchor" href="#查询权限" aria-hidden="true">#</a> 查询权限</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看当前用户</span>
<span class="token function">whoami</span>

如果当前内网中存在域,那么本地普通用户只能查询本机相关信息,不能查询域内信息。
而本地管理员用户和域内用户可以查询域内信息。

其原理是:域内的所有查询都是通过域控制器实现的（基于LDAP协议）,而这个查询需要经过权限认证,所以,只有域用户才拥有这个权限<span class="token punctuation">;</span>当域用户执行查询命令时,会自动使用Kerberos协议进行认证,无须额外输人账 号和密码。

本地管理员Admmistrator权限可以直接提升为Ntauthority或System权限,因此,在域中,除普通用户外,所有的机器都有—个机器用户（用户名是机器名加上<span class="token string">&quot;$&quot;</span>）。在本质上,机器的system用户对应的就是域里面的机器用户所以,使用System权限可以运行域内的查询命令。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="判断域的存在" tabindex="-1"><a class="header-anchor" href="#判断域的存在" aria-hidden="true">#</a> 判断域的存在</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.ipconfig /all
2.systeminfo
3.net config workstation
4.net time /domain

知道域的域名后可配合nslookup命令查询域内dns的主机IP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查询域" tabindex="-1"><a class="header-anchor" href="#查询域" aria-hidden="true">#</a> 查询域</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net view /domain
有可能需要关闭防火墙
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查询域内的所有计算机" tabindex="-1"><a class="header-anchor" href="#查询域内的所有计算机" aria-hidden="true">#</a> 查询域内的所有计算机</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net view/domain:域名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查询域所有用户组列表" tabindex="-1"><a class="header-anchor" href="#查询域所有用户组列表" aria-hidden="true">#</a> 查询域所有用户组列表</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net group /domain

<span class="token comment">#系统自带的常见用户身份如下：</span>
DomainAdmins:域管理员。
DomainComputers:域内机器。
DomainControllers:域控制器。
DomainGusers:域访客,权限较低。
DomainUser:域用户。
EnterpriseAdmins:企业系统管理员用户
在默认情况下, Domain admins和Enterprise Admins对域内所有域控制器有完全控制权限

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查询所有域成员计算机" tabindex="-1"><a class="header-anchor" href="#查询所有域成员计算机" aria-hidden="true">#</a> 查询所有域成员计算机</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net group <span class="token string">&quot;domain computers&quot;</span> /domain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查询域中的admins组用户" tabindex="-1"><a class="header-anchor" href="#查询域中的admins组用户" aria-hidden="true">#</a> 查询域中的Admins组用户</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net group <span class="token string">&quot;domain admins&quot;</span> /domain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查询域中的user组用户" tabindex="-1"><a class="header-anchor" href="#查询域中的user组用户" aria-hidden="true">#</a> 查询域中的User组用户</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net group <span class="token string">&quot;domain users&quot;</span> /domain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="获取域密码策略" tabindex="-1"><a class="header-anchor" href="#获取域密码策略" aria-hidden="true">#</a> 获取域密码策略</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net accounts /domain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="获取域信任信息" tabindex="-1"><a class="header-anchor" href="#获取域信任信息" aria-hidden="true">#</a> 获取域信任信息</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nltest /domain_trusts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="net命令详解" tabindex="-1"><a class="header-anchor" href="#net命令详解" aria-hidden="true">#</a> NET命令详解</h4><ul><li>NET命令是一个命令行命令，Net命令有很多函数用于实用和核查计算机之间的NetBIOS连接，可以查看我们的管 理网络环境、服务、用户、登陆等信息内容；要想获得Net 的HELP可以(1)在Windows下可以用图形的方式，开始- &gt;帮助-&gt;索引-&gt;输入NET；(2)在COMMAND下可以用字符方式：NET /?或NET或NET HELP取得相应的方法的帮助。 所有Net命令接受选项/yes和/no(可缩写为/y和/n)。</li></ul><table><thead><tr><th>主要命令</th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>net view</td><td>net user</td><td>net use</td><td>net time</td><td>net start</td></tr><tr><td>net pause</td><td>net contiue</td><td>net stop</td><td>net statistics</td><td>net share</td></tr><tr><td>net session</td><td>net send</td><td>net print</td><td>net name</td><td>net localgroup</td></tr><tr><td>net group</td><td>net file</td><td>net config</td><td>net computer</td><td>net accounts</td></tr></tbody></table><h3 id="查找域控制器" tabindex="-1"><a class="header-anchor" href="#查找域控制器" aria-hidden="true">#</a> 查找域控制器</h3><h4 id="查看与控制的机器名" tabindex="-1"><a class="header-anchor" href="#查看与控制的机器名" aria-hidden="true">#</a> 查看与控制的机器名</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nltest /DCLIST:域名
<span class="token function">nslookup</span> ‐type<span class="token operator">=</span>SRV _ldap._tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看域控制器组" tabindex="-1"><a class="header-anchor" href="#查看域控制器组" aria-hidden="true">#</a> 查看域控制器组</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net group <span class="token string">&quot;Domain Controllers&quot;</span> /domain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查找域内用户信息" tabindex="-1"><a class="header-anchor" href="#查找域内用户信息" aria-hidden="true">#</a> 查找域内用户信息</h3><h4 id="向域控制器进行查询" tabindex="-1"><a class="header-anchor" href="#向域控制器进行查询" aria-hidden="true">#</a> 向域控制器进行查询</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net user /domain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看存在的用户" tabindex="-1"><a class="header-anchor" href="#查看存在的用户" aria-hidden="true">#</a> 查看存在的用户</h4><ul><li>只有服务器有这个命令</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dsquery user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查询本地管理员" tabindex="-1"><a class="header-anchor" href="#查询本地管理员" aria-hidden="true">#</a> 查询本地管理员</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>net localgroup administrators
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查询域管理用户" tabindex="-1"><a class="header-anchor" href="#查询域管理用户" aria-hidden="true">#</a> 查询域管理用户</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>net group &quot;domain admins&quot; /domain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查询域管理员用户组" tabindex="-1"><a class="header-anchor" href="#查询域管理员用户组" aria-hidden="true">#</a> 查询域管理员用户组</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>net group &quot;Enterprise Admins&quot; /domain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="获取域内用户的详细信息" tabindex="-1"><a class="header-anchor" href="#获取域内用户的详细信息" aria-hidden="true">#</a> 获取域内用户的详细信息</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wmic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="定位域管理员" tabindex="-1"><a class="header-anchor" href="#定位域管理员" aria-hidden="true">#</a> 定位域管理员</h3><h4 id="手动定位" tabindex="-1"><a class="header-anchor" href="#手动定位" aria-hidden="true">#</a> 手动定位</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net view /domain 查看当前域名
net view /domain:域名 查看域内部所有计算机名
net group /domain 查看域内部所有用户组列表
net group <span class="token string">&quot;domain computers&quot;</span> /domain 查看所有域成员计算机列表
net accounts /domain 查看域密码信息
nltest /domian_trusts 获取域信任信息
nltest /DCLIST:域名 查看域控制器机器名
net <span class="token function">time</span> /domain 查看当前时间，因为时间服务器也是主域服务器，可以看到域服务器的机器名
net group <span class="token string">&quot;Domain Controllers&quot;</span> /domain 查看域控制器组，因为可能有不止一台域控，有主备之分
net user /domain 查询域内用户，会看到熟悉的krbtgt用户
wmic useraccount get /all 获取域内用户详细信息
dsquery user 查看域内存在的用户
net localgroup administrators 查看本地管理员用户组
net group <span class="token string">&quot;domain admins&quot;</span> /domain 查询域管理员用户
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="psloggedom-exe工具" tabindex="-1"><a class="header-anchor" href="#psloggedom-exe工具" aria-hidden="true">#</a> psloggedom.exe工具</h4><ul><li>psloggedon.exe 可以显示本地登录的用户和通过本地计算机或远程计算机的资源登录的用户。如果指定了用户名而不是计算机，psloggedon.exe 会搜索网络邻居中的计算机，并显示该用户当前是否已登录。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>psloggedon.exe <span class="token punctuation">[</span>‐<span class="token punctuation">]</span> <span class="token punctuation">[</span>‐l<span class="token punctuation">]</span> <span class="token punctuation">[</span>‐x<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">\\</span><span class="token punctuation">\\</span>computername或username<span class="token punctuation">]</span>
psloggedon.exe <span class="token punctuation">\\</span><span class="token punctuation">\\</span>计算机名
psloggedon.exe 用户名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="pvefindaduser-exe工具" tabindex="-1"><a class="header-anchor" href="#pvefindaduser-exe工具" aria-hidden="true">#</a> PVEFindADUser.exe工具</h4><ul><li>pveFindADUser.exe 可用于查找 Active Directory 用户登录的位置，枚举域用户，以及查找在 特定计算机上登录 的用户，包括本地用户、通过RDP 登录的用户、用于运行服务和计划任务的用户账 户。运行该工具的计算机需要 具有.NETFramework 2.0，并且需要具有管理员权限</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>‐h：显示帮助信息
‐current<span class="token punctuation">[</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">]</span>：如果仅指定‐current参数，将获取目标计算机上当前登录的所有用户。如果指定了用户名（Domain<span class="token punctuation">\\</span>Username），则显示该用户登录的计算机
‐last<span class="token punctuation">[</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">]</span>：如果仅指定‐last参数，将获取目标计算机上最后一个登录用户。如果指定了用户名（Domain<span class="token punctuation">\\</span>Username），则显示此用户上次登录的计算机。根据网络的安全策略，可能会隐藏最后一个登录用户的用户名，此时使用该工具可能无法得到用户名
‐noping：阻止该工具在获取用户登陆信息之前对目标执行ping命令
‐target：可选参数，用于指定要查询的主机。如果未指定该参数，将查询域中的所有主机。如果指定了此参数，主机名列表由逗号分隔
直接运行<span class="token string">&quot;pvefindaduser.exe ‐current&quot;</span>，即可显示域中所有计算机上当前登录的用户
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="netview-exe" tabindex="-1"><a class="header-anchor" href="#netview-exe" aria-hidden="true">#</a> netview.exe</h4><ul><li>netview.exe 是一个枚举工具，使用 WinAPI 枚举系统，利用NetSessionEnum找寻登陆会话，利NetShareEnum 找寻共享，利用NetWkstaUserEnum枚举登陆的用户。同时，netview.exe 能够查询共享入口和有价值的用户。 netview.exe的绝大部分功能不需要管理员权限就可以使用。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>使用语法：
netview.exe <span class="token operator">&lt;</span>参数<span class="token operator">&gt;</span>
‐h：显示帮助菜单。
‐f filename.txt：指定从中提取主机列表的文件。
‐e filename.txt：指定要排除的主机名文件。
‐o filename.txt：将所有输出重定向到文件。
‐d domain：指定从中提取主机列表的域。如果没有指定，则使用当前域。
‐g group：指定用户搜寻的组名。如果没有指定，则使用 Domain Admins。
‐c：检查对已找到共享的访问权限。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nse脚本" tabindex="-1"><a class="header-anchor" href="#nse脚本" aria-hidden="true">#</a> NSE脚本</h4><ul><li>如果存在域账户或者本地账户就可以使用Nmap的smb-enum-sessions.nes引擎获取远程机器的登录会话（不需要管理员权限）。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>smb‐enum‐domain：对域控制器进行信息收集，可以获取主机的信息、用户、可使用密码策略的用户等
smb‐enum‐users：在进行域渗透测试时，如果获得了域内某台主机的权限，无法获取更多的域用户信息，就可以借助这
个脚本对域控制器进行扫描
smb‐enum‐shares：遍历远程主机的共享目录
smb‐enum‐processes：对主机的系统进行遍历。通过这些信息，可以知道目标主机上正在运行哪些软件。
smb‐enum‐sessions：获取域内主机的用户登录会话，查看当前是否有用户登录。
smb‐os‐discovery：收集目标主机的操作系统、计算机名、域名域林名称、NetBIOS机器名、NetBIOS域名，工作组。s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="powerview脚本" tabindex="-1"><a class="header-anchor" href="#powerview脚本" aria-hidden="true">#</a> PowerView脚本</h4><ul><li>PowerView 脚本中包含了一系列的 powershell 脚本，信息收集相关的脚本有 Invoke-StealthUserHunter、 Invoke-UserHunter 等。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>powershell.exe ‐exec bypass ‐command <span class="token string">&quot;&amp; { import‐module .\\PowerView.ps1;Invoke‐UserHunter}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,61),t=[d];function r(l,u){return n(),a("div",null,t)}const o=e(i,[["render",r],["__file","域内基础信息收集.html.vue"]]);export{o as default};
