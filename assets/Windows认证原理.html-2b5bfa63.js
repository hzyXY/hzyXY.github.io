import{_ as i,W as e,X as n,a1 as s}from"./framework-b6a07282.js";const l="/assets/1-dc235df6.jpg",a="/assets/2-d982a504.jpg",d="/assets/3-e18f563c.jpg",r="/assets/4-24396686.jpg",c="/assets/5-c87d9fcc.jpg",v={},h=s('<h2 id="windows认证原理" tabindex="-1"><a class="header-anchor" href="#windows认证原理" aria-hidden="true">#</a> Windows认证原理</h2><h3 id="windows认证" tabindex="-1"><a class="header-anchor" href="#windows认证" aria-hidden="true">#</a> Windows认证</h3><ul><li>本地认证</li><li>网络认证</li><li>域认证</li></ul><p>Windwos存放密码的文件： C:\\Windows\\System32\\config\\SAM %SystemRoot%\\system32\\config\\SAM</p><p>用来认证的程序：Lsass.exe</p><h3 id="windwos本地认证" tabindex="-1"><a class="header-anchor" href="#windwos本地认证" aria-hidden="true">#</a> Windwos本地认证</h3><h4 id="本地认证流程" tabindex="-1"><a class="header-anchor" href="#本地认证流程" aria-hidden="true">#</a> 本地认证流程</h4><ul><li>Windows的登陆密码是储存在系统本地的SAM文件中的，在登陆Windows的时候，系统会将用户输入的密码与SAM文件中的密码进行对比，如果相同，则认证成功</li><li>自己不可以打开SAM文件</li></ul><img src="'+l+'"><ul><li><p>首先，用户注销、重启、锁屏后，操作系统会让winlogon.exe显示登陆界面，也就是输入框界面，接收用户的输入信息后，将密码交给lsass进程，这个过程中会将明文密码保存一份，然后生成一份NTLM Hash，然后将生成的NTLM Hash和本地SAM数据库进行比较。</p></li><li><p>Windows Logon Process（即winlogon.exe）：是Windows NT 用户登陆程序，用于管理用户登陆和退出</p></li><li><p>LSASS：用于微软Windows系统的安全机制，它用于本地安全和登陆策略</p></li><li><p>本地认证中用来处理用户输入密码的进程即lsass.exe,密码会在这个进程中明文保存，供该进程将密码计算成NTLM Hash与sam进行比对，我们使用mimikatz来获取的明文密码，便是在这个进程中读取到的</p></li></ul><h4 id="lm和ntlm哈希" tabindex="-1"><a class="header-anchor" href="#lm和ntlm哈希" aria-hidden="true">#</a> LM和NTLM哈希</h4><ul><li>Windows不存储用户的明文密码</li><li>Windwos操作系统中密码一般由两部分组成,一部分为LM Hash,另一部分为NTLMHash（两者均为相同的密码，只是不同的算法）。</li><li>username:RID:LM‐HASH:NT‐HASH</li></ul><img src="'+a+`"><h5 id="lan-manager-hash挑战-响应验证机制-lm-hash" tabindex="-1"><a class="header-anchor" href="#lan-manager-hash挑战-响应验证机制-lm-hash" aria-hidden="true">#</a> LAN Manager Hash挑战/响应验证机制（LM Hash）</h5><ul><li>LM Hash的全名为&quot;LAN Manager Hash&quot;,是微软为了提高 Windows操作系统的安全性而采 用的散列加密算法,其本质是DES加密。尽管 LM Hash较容易被破解,但为了保证系统的兼容性, Windows只是将LM Hash禁用了(从 Windows vista和 Windows Server2008版本开始, Windows操作系统默认禁用 LM Hash)。 LM Hash明文密码被限定在14位以内,也就是说,如果要停止使用 LM Hash,将用户的密码设置为14位以上即可。如果 LM Hash被禁用了, 攻击者通过工具抓取的 LM Hash通常 为<code>AAD3B435B51404EEAAD3B435B51404EE</code>(表示 LM Hash为空值或被禁用)</li></ul><h6 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h6><ol><li>将明文口令转换为其大写的形式，然后将大写后的口令转换为16进制的字符串，如果转换后不足14字节则用0补全，最后将上述编码分成2组7字节。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>明文口令：Admin@123

1.转换为大写：ADMIN@123

2.转换为16进制字符串：41444D494E40313233 （不足14字节）

用0补全：41 44 4D 49 4E 40 31 32 33 00 00 00 00 00

3.分成两组：
41 44 4D 49 4E 40 31
32 33 00 00 00 00 00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>首先将每一组7字节的十六进制转换为二进制，然后分每7bit一组末尾加0，最后再转换成十六进制组得到2组8字节的编码。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>第一组：
1.将第一组7字节的十六进制转换为二进制
41444D494E4031转换为二进制：01000001010001000100110101001001010011100100000000110001

2.分组，每7bit为一组并在末尾加一个0
01000000
10100010
00010010
10101000
10010100
01110010
00000000
01100010
合并后为：0100000010100010000100101010100010010100011100100000000001100010

3.再转换为16进制：
40A212A894720062

第二组：
1.将第二组7字节的十六进制转换为二进制
32330000000000转换为二进制：00110010001100110000000000000000000000000000000000000000

2.分组，每7bit为一组并在末尾加一个0
00110010
00011000
11000000
00000000
00000000
00000000
00000000
00000000
合并后为：0011001000011000110000000000000000000000000000000000000000000000

3.再转换为16进制：
3218C00000000000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>将上述步骤得到的两组16进制的8字节编码，分别进行des加密。加密的key为<code>KGS!@#$%</code>的16进制。（4B47532140232425）</li></ol><img src="`+d+'"><img src="'+r+`"><p>最后将两次des加密的结果拼接起来： 6F08D7B306B1DAD4B75E0C8D76954A50</p><h5 id="windowsnt-hash挑战-响应验证机制-ntlm-hash" tabindex="-1"><a class="header-anchor" href="#windowsnt-hash挑战-响应验证机制-ntlm-hash" aria-hidden="true">#</a> WindowsNT Hash挑战/响应验证机制（NTLM Hash）</h5><ul><li>NTLM Hash是微软为了在提高安全性的同时保证兼容性而设计的散列加密算法。 NTLM Hash 是基于MD4加密算法进行加密的。个人版从 Windows vista以后,服务器版从Windows Server 2003以后, Windows操作系统的认证方 式均为 NTLM Hash</li><li>为了解决LM加密和身份验证方案中固有的安全弱点，Microsoft 于1993年在Windows NT 3.1中引入了NTLM协 议。下面是各个版本对LM和NTLM的支持。</li></ul><h6 id="原理-1" tabindex="-1"><a class="header-anchor" href="#原理-1" aria-hidden="true">#</a> 原理</h6><ol><li>首先将明文密码转换成十六进制字符串，然后转换为Unicode格式，即每个字节为一组在末尾添加0x00</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>明文口令：Admin@123

1.转换成十六进制字符串：
41646D696E40313233

2.转换为Unicode格式，每个字节为一组，在末尾添加0x00
4100 6400 6D00 6900 6E00 4000 3100 3200 3300
合并
410064006D0069006E004000310032003300

3.对Unicode字符串执行md4加密，生成32位的十六进制字符串：
570a9a65db8fba761c1008a51d4c95ab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="`+c+'"><h4 id="ntlm协议" tabindex="-1"><a class="header-anchor" href="#ntlm协议" aria-hidden="true">#</a> NTLM协议</h4><ul><li><p>在平时的测试中，经常会碰到处于工作组的计算机，处于工作组的计算机之间是无法建立一个可信的信托机构的， 只能是点对点进行信息的传输。举个例子就是，主机A想要访问主机B上的资源，就要向主机B发送一个存在于主机B上的一个账户，主机B接收以后会在本地进行验证，如果验证成功，才会允许主机A进行相应的访问。</p></li><li><p>NTLM 协议是一种基于 挑战（Chalenge）/响应（Response） 认证机制，仅支持Windows的网络认证协议。</p></li><li><p>主要分为协商、质询、验证三个过程</p></li></ul><p>协商：这个是为了解决历史遗留问题，也就是为了向下兼容，双方先确定一下传输协议的版本等各种信息。</p><p>质询：就是挑战/响应认证机制起作用的范畴</p><p>验证：对质询的最后结果进行一个验证，验证通过后，即允许访问资源。</p><h5 id="认证流程" tabindex="-1"><a class="header-anchor" href="#认证流程" aria-hidden="true">#</a> 认证流程</h5><ol><li>客户端向服务端发送用户信息（用户名）请求</li><li>服务器接受到请求，判断本地账户列表是否有用户名，如果有，生成一个16位的随机数，被称之为“Challenge”，使用登陆用户名对应NTLM Hash加密Challenge（16位随机字符），生成Challenge1，生成一个Net-NTLM Hash存在内存中，同时，生成Challenge1后，将Challenge（16位随机字符）发送给客户端。</li><li>客户端接收到Challenge后，使用将要登陆的账户对应的NTLM Hash加密Challenge生成Response，然后将Response发送至服务器端。</li><li>验证，服务器接收到客户端的Response后，对比Challenge1与Response是否相等，若相等，则认证通过。</li></ol>',37),o=[h];function t(u,m){return e(),n("div",null,o)}const p=i(v,[["render",t],["__file","Windows认证原理.html.vue"]]);export{p as default};
