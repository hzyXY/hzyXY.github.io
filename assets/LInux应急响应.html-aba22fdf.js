import{_ as i,W as l,X as t,Y as n,Z as s,a0 as e,a1 as r,C as p}from"./framework-b6a07282.js";const o="/assets/8-c34091a0.jpg",c="/assets/12-17f295b6.jpg",d="/assets/13-e33722a6.jpg",u="/assets/1-43eec715.jpg",m="/assets/2-041de650.jpg",v="/assets/6-231dd741.jpg",b="/assets/3-bce8f528.jpg",k="/assets/4-71b40077.jpg",h="/assets/7-a548efcd.jpg",f="/assets/5-4e49bdf5.jpg",g="/assets/9-1191063c.jpg",_="/assets/10-d8dc5cca.jpg",w="/assets/11-8e8bd09c.jpg",x="/assets/15-cea90aef.jpg",y="/assets/14-1c573947.jpg",q="/assets/16-e64dffd3.jpg",$="/assets/17-810e4be8.jpg",P="/assets/18-7e4b4abe.jpg",S="/assets/19-98f5a915.jpg",E="/assets/20-a6111ad3.jpg",T="/assets/21-edaeb0ce.jpg",C="/assets/22-44e04795.jpg",I="/assets/23-77089f88.jpg",R="/assets/24-071574c4.jpg",D="/assets/25-3c9c46a9.jpg",U="/assets/26-93e34ce0.jpg",N={},j=r(`<h2 id="linux应急响应" tabindex="-1"><a class="header-anchor" href="#linux应急响应" aria-hidden="true">#</a> Linux应急响应</h2><p>先找客户了解主机的基本情况。如：</p><p>​ 主机是否存在弱口令</p><p>​ 主机是否对外网接通</p><p>​ 什么时候发现电脑被入侵，网络攻击的事件类型。</p><p>​ 主机日常是否有人进行维护</p><p>主机是作为客户机还是服务器 客户机：最近有没有点一些恶意链接，或收到钓鱼邮件</p><p>服务器：主机开放了什么服务，日常扮演的角色。</p><h3 id="_1-熟悉系统环境" tabindex="-1"><a class="header-anchor" href="#_1-熟悉系统环境" aria-hidden="true">#</a> 1.熟悉系统环境</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.显示系统相关信息
<span class="token function">uname</span> <span class="token parameter variable">-a</span> 
<span class="token function">cat</span> /proc/version 
lsb_release <span class="token parameter variable">-a</span> <span class="token comment">#需要安装lsb core软件包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-检查开放端口" tabindex="-1"><a class="header-anchor" href="#_3-检查开放端口" aria-hidden="true">#</a> 3.检查开放端口</h3><p>netstat命令：</p><ul><li>-a 显示所有</li><li>-n 数字形式展示连接端口</li><li>-t 仅查看TCP连接情况</li><li>-u 仅查看UDP连接情况</li><li>-p 显示相关程序名</li></ul><table><thead><tr><th>状态</th><th>作用</th></tr></thead><tbody><tr><td>LISTEN</td><td>监听TCP端口，等待远程连接</td></tr><tr><td>TIME-WAIT</td><td>等待一段时间确保远程TCP中断请求</td></tr><tr><td>ESTABLISHED</td><td>已成功连接</td></tr><tr><td>SYN_RECY</td><td>接收和发送连接请求后等待确认连接请求确认的情况</td></tr><tr><td>CLOSEING</td><td>等待远程TCP对连接中断的确认</td></tr><tr><td>CLOSE</td><td>连接完全关闭</td></tr></tbody></table><h4 id="netstat-antpl-查看开放端口" tabindex="-1"><a class="header-anchor" href="#netstat-antpl-查看开放端口" aria-hidden="true">#</a> netstat -antpl（查看开放端口）</h4><img src="`+o+'"><h4 id="lsof-i-端口号-查看该端口对应的进程" tabindex="-1"><a class="header-anchor" href="#lsof-i-端口号-查看该端口对应的进程" aria-hidden="true">#</a> lsof -i:[端口号]查看该端口对应的进程</h4><img src="'+c+'"><h4 id="fuser-n-tcp-端口号-查看该端口对应的进程pid" tabindex="-1"><a class="header-anchor" href="#fuser-n-tcp-端口号-查看该端口对应的进程pid" aria-hidden="true">#</a> fuser -n tcp [端口号]查看该端口对应的进程pid</h4><img src="'+d+`"><h4 id="kill-9-进程pid-杀死可疑进程" tabindex="-1"><a class="header-anchor" href="#kill-9-进程pid-杀死可疑进程" aria-hidden="true">#</a> kill -9 [进程pid] 杀死可疑进程</h4><h3 id="_2-运行进程排查" tabindex="-1"><a class="header-anchor" href="#_2-运行进程排查" aria-hidden="true">#</a> 2.运行进程排查</h3><ul><li>通过进程运行的命令、资源占用、位置等来查找可疑进程。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### 通过进程查找可执行文件</span>
<span class="token function">sudo</span> <span class="token function">ps</span> <span class="token parameter variable">-efcaux</span> <span class="token comment">#查看所有进程</span>
<span class="token function">sudo</span> <span class="token function">lsof</span> <span class="token parameter variable">-p</span> <span class="token number">5105</span> <span class="token comment">#查看pid为5105的进程详细信息，一般第三项为文件路径，/usr/sbin/vsftpd，如果把这个文件删掉，这个文件就不会运行了。</span>
<span class="token function">sudo</span> <span class="token function">ls</span> <span class="token parameter variable">-al</span> /proc/5105/exe <span class="token comment">#查看pid为5105的进程文件绝对路径</span>

<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> vsftpd

<span class="token number">1</span>.查看隐藏进程
 <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print}&#39;</span><span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">ls</span> /proc <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token operator">&gt;</span> <span class="token number">2</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># sudo ps -efcaux #查看所有进程</span>
<span class="token environment constant">USER</span>        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root          <span class="token number">2</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>      <span class="token number">0</span>     <span class="token number">0</span> ?        S    <span class="token number">10</span>:19   <span class="token number">0</span>:00 kthreadd
root          <span class="token number">4</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>      <span class="token number">0</span>     <span class="token number">0</span> ?        S<span class="token operator">&lt;</span>   <span class="token number">10</span>:19   <span class="token number">0</span>:00  <span class="token punctuation">\\</span>_ kworker/0:
root          <span class="token number">5</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>      <span class="token number">0</span>     <span class="token number">0</span> ?        S    <span class="token number">10</span>:19   <span class="token number">0</span>:00  <span class="token punctuation">\\</span>_ kworker/u2
root          <span class="token number">6</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>      <span class="token number">0</span>     <span class="token number">0</span> ?        S    <span class="token number">10</span>:19   <span class="token number">0</span>:00  <span class="token punctuation">\\</span>_ ksoftirqd/
root          <span class="token number">7</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>      <span class="token number">0</span>     <span class="token number">0</span> ?        S    <span class="token number">10</span>:19   <span class="token number">0</span>:00  <span class="token punctuation">\\</span>_ migration/
root          <span class="token number">8</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>      <span class="token number">0</span>     <span class="token number">0</span> ?        S    <span class="token number">10</span>:19   <span class="token number">0</span>:00  <span class="token punctuation">\\</span>_ rcu_bh
root          <span class="token number">9</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>      <span class="token number">0</span>     <span class="token number">0</span> ?        S    <span class="token number">10</span>:19   <span class="token number">0</span>:01  <span class="token punctuation">\\</span>_ rcu_sched
root         <span class="token number">10</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>      <span class="token number">0</span>     <span class="token number">0</span> ?        S<span class="token operator">&lt;</span>   <span class="token number">10</span>:19   <span class="token number">0</span>:00  <span class="token punctuation">\\</span>_ lru-add-dr
root         <span class="token number">11</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>      <span class="token number">0</span>     <span class="token number">0</span> ?        S    <span class="token number">10</span>:19   <span class="token number">0</span>:00  <span class="token punctuation">\\</span>_ watchdog/0
<span class="token punctuation">..</span>.
root       <span class="token number">5105</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>  <span class="token number">53292</span>   <span class="token number">576</span> ?        Ss   <span class="token number">11</span>:11   <span class="token number">0</span>:00 vsftpd


<span class="token punctuation">[</span>hzy@localhost root<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">lsof</span> <span class="token parameter variable">-p</span> <span class="token number">5105</span> <span class="token comment">#查看pid为5105的进程详细信息，一般第三项为文件路径，/usr/sbin/vsftpd，如果把这个文件删掉，这个文件就不会运行了。</span>
lsof: WARNING: can&#39;t stat<span class="token punctuation">(</span><span class="token punctuation">)</span> fuse.gvfsd-fuse <span class="token function">file</span> system /run/user/1000/gvfs
      Output information may be incomplete.
COMMAND  PID <span class="token environment constant">USER</span>   FD   TYPE             DEVICE SIZE/OFF    NODE NAME
vsftpd  <span class="token number">5105</span> root  cwd    DIR              <span class="token number">253,0</span>      <span class="token number">224</span>      <span class="token number">64</span> /
vsftpd  <span class="token number">5105</span> root  rtd    DIR              <span class="token number">253,0</span>      <span class="token number">224</span>      <span class="token number">64</span> /
vsftpd  <span class="token number">5105</span> root  txt    REG              <span class="token number">253,0</span>   <span class="token number">175440</span>   <span class="token number">30925</span> /usr/sbin/vsftpd
vsftpd  <span class="token number">5105</span> root  mem    REG              <span class="token number">253,0</span>   <span class="token number">402384</span>  <span class="token number">117853</span> /usr/lib64/libpcre.so.1.2.0
vsftpd  <span class="token number">5105</span> root  mem    REG              <span class="token number">253,0</span>   <span class="token number">155744</span>  <span class="token number">117869</span> /usr/lib64/libselinux.so.1
vsftpd  <span class="token number">5105</span> root  mem    REG              <span class="token number">253,0</span>    <span class="token number">23968</span>  <span class="token number">117888</span> /usr/lib64/libcap-ng.so.0.0.0
vsftpd  <span class="token number">5105</span> root  mem    REG              <span class="token number">253,0</span>   <span class="token number">142144</span>  <span class="token number">325220</span> /usr/lib64/libpthread-2.17.so
vsftpd  <span class="token number">5105</span> root  mem    REG              <span class="token number">253,0</span>   <span class="token number">109976</span>  <span class="token number">325222</span> /usr/lib64/libresolv-2.17.so

<span class="token punctuation">[</span>hzy@localhost root<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">ls</span> <span class="token parameter variable">-al</span> /proc/5105/exe <span class="token comment">#查看pid为5105的进程文件绝对路径</span>
lrwxrwxrwx. <span class="token number">1</span> root root <span class="token number">0</span> <span class="token number">2</span>月   <span class="token number">3</span> <span class="token number">11</span>:13 /proc/5105/exe -<span class="token operator">&gt;</span> /usr/sbin/vsftpd


<span class="token punctuation">[</span>hzy@localhost <span class="token number">5105</span><span class="token punctuation">]</span>$ <span class="token builtin class-name">pwd</span>
/proc/5105
<span class="token punctuation">[</span>hzy@localhost <span class="token number">5105</span><span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">ls</span> <span class="token comment">#5105进程的文件</span>
attr             cwd       map_files   oom_adj        schedstat  task
autogroup        environ   maps        oom_score      sessionid  timers
auxv             exe       mem         oom_score_adj  setgroups  uid_map
cgroup           fd        mountinfo   pagemap        smaps      wchan
clear_refs       fdinfo    mounts      patch_state    stack
cmdline          gid_map   mountstats  personality    <span class="token function">stat</span>
<span class="token function">comm</span>             io        net         projid_map     statm
coredump_filter  limits    ns          root           status
cpuset           loginuid  numa_maps   sched          syscall

cwd：符号连接（类似快捷方式）的是进程运行目录
exe：符号连接（类似快捷方式）的是执行程序的绝对路径
cmdline：符号连接（类似快捷方式）的是进程运行目录
environ：记录进程运行时系统的环境变量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ps-ef" tabindex="-1"><a class="header-anchor" href="#ps-ef" aria-hidden="true">#</a> ps -ef</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> <span class="token punctuation">[</span>选项<span class="token punctuation">]</span>
    <span class="token parameter variable">-e</span> 显示所有进程。
    <span class="token parameter variable">-f</span> 全格式。
    <span class="token parameter variable">-h</span> 不显示标题。
    <span class="token parameter variable">-l</span> 长格式。
    <span class="token parameter variable">-w</span> 宽输出。
    a 显示终端上的所有进程，包括其他用户的进程。
    r 只显示正在运行的进程。
    u 以用户为主的格式来显示程序状况。
    x 显示所有程序，不以终端机来区分。

命令显示参数解释：    
<span class="token environment constant">UID</span> 用户ID
PID 进程ID
<span class="token environment constant">PPID</span> 父进程ID
C CPU占用率
STIME 开始时间
TTY 开始此进程的TTY----终端设备
TIME 此进程运行的总时间
CMD 命令名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="`+u+`"><h4 id="ps-aux" tabindex="-1"><a class="header-anchor" href="#ps-aux" aria-hidden="true">#</a> ps aux</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>命令显示参数解释：
<span class="token environment constant">USER</span> 用户名
%CPU 进程占用的CPU百分比
%MEM 占用内存的百分比
VSZ 该进程使用的虚拟內存量（KB）
RSS 该进程占用的固定內存量（KB）（驻留中页的数量）
STAT 进程的状态
START 该进程被触发启动时间
TIME 该进程实际使用CPU运行的时间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="`+m+'"><h5 id="ps-p-pid-o-lstart-查看进程开放的时间" tabindex="-1"><a class="header-anchor" href="#ps-p-pid-o-lstart-查看进程开放的时间" aria-hidden="true">#</a> ps -p [pid] -o lstart（查看进程开放的时间）</h5><img src="'+v+`"><h4 id="top-动态查看进程资源占用" tabindex="-1"><a class="header-anchor" href="#top-动态查看进程资源占用" aria-hidden="true">#</a> top 动态查看进程资源占用</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>命令显示参数解释：
<span class="token comment">#第一部分是前5行，是系统整体的统计信息；</span>
第一行：
top：当前时间
up：机器运行了多长时间
users：当前登录用户数
load average：系统负载，即任务队列的平均长度。三个数值分别为 <span class="token number">1</span>分钟、5分钟、15分钟前到现在的平均值。

第二行
Tasks：当前有多少进程
running：正在运行的进程数
sleeping：正在休眠的进程数
stopped：停止的进程数
zombie：僵尸进程数

第三行
us：用户空间占CPU的百分比（像shell程序、各种语言的编译器、各种应用、web服务器和各种桌面应用都算是运行在用户地址空间的进程，这些程序如果不是处于idle状态，那么绝大多数的CPU时间都是运行在用户态）
sy： 内核空间占CPU的百分比（所有进程要使用的系统资源都是由Linux内核处理的，对于操作系统的设计来说，消耗在内核态的时间应该是越少越好，在实践中有一类典型的情况会使sy变大，那就是大量的IO操作，因此在调查IO相关的问题时需要着重关注它）
ni：用户进程空间改变过优先级（ni是nice的缩写，可以通过nice值调整进程用户态的优先级，这里显示的ni表示调整过nice值的进程消耗掉的CPU时间，如果系统中没有进程被调整过nice值，那么ni就显示为0）
id： 空闲CPU占用率
wa： 等待输入输出的CPU时间百分比（和CPU的处理速度相比，磁盘IO操作是非常慢的，有很多这样的操作，比如，CPU在启动一个磁盘读写操作后，需要等待磁盘读写操作的结果。在磁盘读写操作完成前，CPU只能处于空闲状态。Linux系统在计算系统平均负载时会把CPU等待IO操作的时间也计算进去，所以在我们看到系统平均负载过高时，可以通过wa来判断系统的性能瓶颈是不是过多的IO操作造成的）
hi： 硬中断占用百分比（硬中断是硬盘、网卡等硬件设备发送给CPU的中断消息，当CPU收到中断消息后需要进行适当的处理<span class="token punctuation">(</span>消耗CPU时间<span class="token punctuation">)</span>。）
si：软中断占用百分比（软中断是由程序发出的中断，最终也会执行相应的处理程序，消耗CPU时间）
st：steal <span class="token function">time</span>

第四行
total：物理内存总量
free：空闲内存量
used：使用的内存量
buffer/cache：用作内核缓存的内存量

第五行
total：交换区内存总量
free：空闲交换区总量
used：使用的交换区总量
buffer/cache：缓冲的交换区总量


<span class="token comment">#第二部分是第8行开始的进程信息</span>
PID  	进程id
<span class="token environment constant">USER</span>	进程所有者的用户名
PR	   	优先级
NI		nice值，负值表示高优先级，正值表示低优先级
VIRT	进程使用的虚拟内存总量，单位kb。VIRT<span class="token operator">=</span>SWAP+RES
RES		进程使用的、未被换出的物理内存大小，单位kb。RES<span class="token operator">=</span>CODE+DATA
SHR		共享内存大小，单位kb
S		进程状态。D<span class="token operator">=</span>不可中断的睡眠状态 <span class="token assign-left variable">R</span><span class="token operator">=</span>运行 <span class="token assign-left variable">S</span><span class="token operator">=</span>睡眠 <span class="token assign-left variable">T</span><span class="token operator">=</span>跟踪/停止 <span class="token assign-left variable">Z</span><span class="token operator">=</span>僵尸进程
%CPU	上次更新到现在的CPU时间占用百分比
%MEM	进程使用的物理内存百分比
TIME+	进程使用的CPU时间总计，单位1/100秒
COMMAND	命令名/命令行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="`+b+'"><h4 id="pstree-树形结构显示进程之间的关系" tabindex="-1"><a class="header-anchor" href="#pstree-树形结构显示进程之间的关系" aria-hidden="true">#</a> pstree 树形结构显示进程之间的关系</h4><img src="'+k+'"><h5 id="pstree-h-pid-p-a-查看某个pid的进程树" tabindex="-1"><a class="header-anchor" href="#pstree-h-pid-p-a-查看某个pid的进程树" aria-hidden="true">#</a> pstree -h [pid] -p -a 查看某个pid的进程树</h5><img src="'+h+'"><h4 id="ll-proc-进程pid-获取进程运行的路径" tabindex="-1"><a class="header-anchor" href="#ll-proc-进程pid-获取进程运行的路径" aria-hidden="true">#</a> ll /proc/[进程pid] 获取进程运行的路径</h4><img src="'+f+'"><h4 id="lsof-i-查看正在进行的网络连接" tabindex="-1"><a class="header-anchor" href="#lsof-i-查看正在进行的网络连接" aria-hidden="true">#</a> lsof -i（查看正在进行的网络连接）</h4><img src="'+g+'"><h4 id="lsof-p-pid-查看进程pid打开的文件" tabindex="-1"><a class="header-anchor" href="#lsof-p-pid-查看进程pid打开的文件" aria-hidden="true">#</a> lsof -p [pid]查看进程PID打开的文件</h4><img src="'+_+'"><h4 id="lsof-c-进程名-查看该进程打开的文件" tabindex="-1"><a class="header-anchor" href="#lsof-c-进程名-查看该进程打开的文件" aria-hidden="true">#</a> lsof -c [进程名]查看该进程打开的文件</h4><img src="'+w+'"><h4 id="kill-9-进程pid-杀死可疑进程-1" tabindex="-1"><a class="header-anchor" href="#kill-9-进程pid-杀死可疑进程-1" aria-hidden="true">#</a> kill -9 [进程pid] 杀死可疑进程</h4><h3 id="_4-检查系统服务" tabindex="-1"><a class="header-anchor" href="#_4-检查系统服务" aria-hidden="true">#</a> 4.检查系统服务</h3><h4 id="systemctl-list-unit-files-查看服务的启动或关闭状态" tabindex="-1"><a class="header-anchor" href="#systemctl-list-unit-files-查看服务的启动或关闭状态" aria-hidden="true">#</a> systemctl list-unit-files 查看服务的启动或关闭状态</h4><img src="'+x+`"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#发现恶意程序</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl stop vsftpd.service #停止程序</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl disable vsftpd.service #删除开机启动项</span>
Removed symlink /etc/systemd/system/multi-user.target.wants/vsftpd.service.
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl list-unit-files | grep vsftp</span>
vsftpd.service                                disabled

<span class="token comment">#关错了，vsftp不是恶意程序，是ftp服务器。</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl start vsftpd.service #启动服务</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl enable vsftpd.service #添加开机启动</span>
Created symlink from /etc/systemd/system/multi-user.target.wants/vsftpd.service to /usr/lib/systemd/system/vsftpd.service.
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl list-unit-files | grep vsftp</span>
vsftpd.service                                enabled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="service-status-all-枚举主机的所有服务" tabindex="-1"><a class="header-anchor" href="#service-status-all-枚举主机的所有服务" aria-hidden="true">#</a> service --status-all（枚举主机的所有服务）</h4><ul><li>Ubuntu系统可执行</li></ul><img src="`+y+`"><h3 id="_5-检查历史命令" tabindex="-1"><a class="header-anchor" href="#_5-检查历史命令" aria-hidden="true">#</a> 5. 检查历史命令</h3><h4 id="history" tabindex="-1"><a class="header-anchor" href="#history" aria-hidden="true">#</a> history</h4><h4 id="cat-bash-history" tabindex="-1"><a class="header-anchor" href="#cat-bash-history" aria-hidden="true">#</a> cat ~/.bash_history</h4><h3 id="_6-查看计划任务" tabindex="-1"><a class="header-anchor" href="#_6-查看计划任务" aria-hidden="true">#</a> 6.查看计划任务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/var/spool/cron/ 目录里面的任务以用户命名
/etc/crontab 调度管理维护任务
/etc/cron.d/ 这个目录用来存放任何要执行的crontab文件或脚本

下面这些都是重点检查对象
/etc/cron.hourly/
/etc/cron.daily/ 
/etc/cron.weekly/
/etc/cron.monthly/

/etc/cron.allow 该文件存放允许创建定时任务的账户（白名单），一行一个账户，已创建的定时任务不受影响。
/etc/cron.deny 该文件存在禁止创建定时任务的账户（黑名单），一行一个账户，已创建的定时任务不受影响。
<span class="token function">crontab</span> <span class="token parameter variable">-e</span> <span class="token comment">#创建计划任务</span>

<span class="token punctuation">[</span>hzy@localhost root<span class="token punctuation">]</span>$ <span class="token function">crontab</span> <span class="token parameter variable">-e</span> <span class="token comment">#被禁止的效果</span>
You <span class="token punctuation">(</span>hzy<span class="token punctuation">)</span> are not allowed to use this program <span class="token punctuation">(</span>crontab<span class="token punctuation">)</span>
See crontab<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">for</span> <span class="token function">more</span> informatio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="crontab-l" tabindex="-1"><a class="header-anchor" href="#crontab-l" aria-hidden="true">#</a> crontab -l</h4><img src="`+q+'"><h4 id="查看root的计划任务" tabindex="-1"><a class="header-anchor" href="#查看root的计划任务" aria-hidden="true">#</a> 查看root的计划任务</h4><ul><li>crontab -u root -l</li></ul><h4 id="cat-etc-anacrontab-查看异步定时任务" tabindex="-1"><a class="header-anchor" href="#cat-etc-anacrontab-查看异步定时任务" aria-hidden="true">#</a> cat /etc/anacrontab 查看异步定时任务</h4><img src="'+$+'"><h4 id="more-var-log-cron-查看计划任务日志" tabindex="-1"><a class="header-anchor" href="#more-var-log-cron-查看计划任务日志" aria-hidden="true">#</a> more /var/log/cron 查看计划任务日志</h4><img src="'+P+`"><h4 id="more-var-spool-cron-查看用户自定义的定时任务" tabindex="-1"><a class="header-anchor" href="#more-var-spool-cron-查看用户自定义的定时任务" aria-hidden="true">#</a> more /var/spool/cron/* 查看用户自定义的定时任务</h4><h3 id="_7-排查文件" tabindex="-1"><a class="header-anchor" href="#_7-排查文件" aria-hidden="true">#</a> 7.排查文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">find</span>

文件名
<span class="token parameter variable">-name</span> 区分大小写
<span class="token parameter variable">-iname</span> 不区分大小写

文件类型
<span class="token parameter variable">-type</span>
	f 找普通文件
	d 找目录
	i 找软连接

文件大小
<span class="token parameter variable">-size</span>
	+50k 比50k大的文件
	<span class="token parameter variable">-100k</span> 比100k小的文件
	+50M 比50M大的文件
	<span class="token parameter variable">-100G</span> 比100G小的文件

修改时间
<span class="token parameter variable">-atime</span> 文件被读取或者执行的时间
<span class="token parameter variable">-mtime</span> 文件状态改变时间，如通过chmod修改文件属性
<span class="token parameter variable">-ctime</span> 文件内容被修改的时间
	+5 <span class="token number">6</span>天前修改的文件
	<span class="token parameter variable">-5</span> <span class="token number">5</span>天内修改的文件
    <span class="token number">5</span> 	精确到前5天的那一天修改的文件
    <span class="token number">0</span> 	今天，24小时内

修改权限
<span class="token parameter variable">-perm</span> <span class="token number">777</span> 查找修改权限为777的文件

所属组所有者
<span class="token parameter variable">-uid</span>
<span class="token parameter variable">-gid</span>
<span class="token parameter variable">-user</span> 用户名
<span class="token parameter variable">-nouser</span> 没有所有者的文件，一些垃圾文件

逻辑运算
<span class="token operator">&amp;</span> 与 <span class="token parameter variable">-a</span>
<span class="token operator">|</span> 或 <span class="token parameter variable">-o</span>
  非 <span class="token parameter variable">-not</span>
<span class="token function">find</span> <span class="token parameter variable">-mtine</span> <span class="token number">3</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-perm</span> <span class="token number">777</span>
<span class="token function">find</span> <span class="token parameter variable">-name</span> <span class="token string">&#39;*.php&#39;</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-name</span> <span class="token string">&#39;*.jsp&#39;</span>


<span class="token function">awk</span> <span class="token punctuation">[</span>选项<span class="token punctuation">]</span> <span class="token string">&#39;匹配规则 处理规则&#39;</span> 路径
<span class="token parameter variable">-F</span> 默认空格 <span class="token builtin class-name">:</span> ,
设置变量 数组 定义函数 加减运算 字符串的拼接

<span class="token function">uniq</span> <span class="token operator">&gt;</span> <span class="token number">1</span> 去重 -c计数

<span class="token function">awk</span> -F: <span class="token string">&#39;length($2)==2 {print $1}&#39;</span> /etc/shadow <span class="token comment">#查找空密码的账户</span>


<span class="token function">grep</span>
<span class="token parameter variable">-c</span> 统计行数
<span class="token parameter variable">-v</span> <span class="token function">ssh</span> 不选择ssh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查找-php结尾的文件" tabindex="-1"><a class="header-anchor" href="#查找-php结尾的文件" aria-hidden="true">#</a> 查找.php结尾的文件</h4><ul><li>find -name &quot;*.php&quot;</li></ul><h4 id="查找文件中存在eval字符的并以-php结尾的文件" tabindex="-1"><a class="header-anchor" href="#查找文件中存在eval字符的并以-php结尾的文件" aria-hidden="true">#</a> 查找文件中存在eval字符的并以.php结尾的文件</h4><ul><li>find -type f -name &quot;*.php&quot; | xargs grep &#39;eval&#39; | more</li></ul><h4 id="最近两分钟被修改过的文件" tabindex="-1"><a class="header-anchor" href="#最近两分钟被修改过的文件" aria-hidden="true">#</a> 最近两分钟被修改过的文件</h4><ul><li>find / -mmin -2 | grep etc</li></ul><h4 id="查看-天内被修改过的文件" tabindex="-1"><a class="header-anchor" href="#查看-天内被修改过的文件" aria-hidden="true">#</a> 查看*天内被修改过的文件</h4><ul><li>find /usr/bin/ /usr/sbin/ /bin/ /usr/local/bin/ -type f -mtime -7 | xargs ls -alh #查看7天内/usr/bin/ /usr/sbin/ /bin/ /usr/local/bin/这个几个文件夹内有被修改过的所有类型的文件</li><li>find /root/ -type f -mtime -3 -name &quot;*.txt&quot; | xargs ls -alh #查看3天内/root/文件夹内有被修改过的txt文件</li></ul><h4 id="查看文件的修改时间" tabindex="-1"><a class="header-anchor" href="#查看文件的修改时间" aria-hidden="true">#</a> 查看文件的修改时间</h4><ul><li>ls --full-time /etc/ssh/sshd_config</li></ul><h4 id="查看历史命令记录文件" tabindex="-1"><a class="header-anchor" href="#查看历史命令记录文件" aria-hidden="true">#</a> 查看历史命令记录文件</h4><ul><li>cat ~/.bash_history</li></ul><h4 id="查找777的权限的文件" tabindex="-1"><a class="header-anchor" href="#查找777的权限的文件" aria-hidden="true">#</a> 查找777的权限的文件</h4><ul><li>find . -name *.jsp -perm 777</li></ul><h4 id="查看文件md5值" tabindex="-1"><a class="header-anchor" href="#查看文件md5值" aria-hidden="true">#</a> 查看文件md5值</h4><ul><li>linux:md5sum 文件名</li></ul><h3 id="_8-查看当前加载的内核模块" tabindex="-1"><a class="header-anchor" href="#_8-查看当前加载的内核模块" aria-hidden="true">#</a> 8.查看当前加载的内核模块</h3><ul><li>lsmod</li></ul><img src="`+S+`"><h3 id="_9-排查后门" tabindex="-1"><a class="header-anchor" href="#_9-排查后门" aria-hidden="true">#</a> 9.排查后门</h3><h4 id="排查超级用户" tabindex="-1"><a class="header-anchor" href="#排查超级用户" aria-hidden="true">#</a> 排查超级用户</h4><ul><li>awk -F: &#39;$3==0{print $1}&#39; /etc/passwd</li></ul><h4 id="查看攻击者是否在authorized-keys添加ssh私钥" tabindex="-1"><a class="header-anchor" href="#查看攻击者是否在authorized-keys添加ssh私钥" aria-hidden="true">#</a> 查看攻击者是否在authorized_keys添加ssh私钥</h4><ul><li>cat ~/.ssh/authorized_keys</li></ul><h4 id="查看所有账户" tabindex="-1"><a class="header-anchor" href="#查看所有账户" aria-hidden="true">#</a> 查看所有账户</h4><ul><li>cat /etc/passwd</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[hzy@localhost root]$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown

后面跟着的参数：
/bin/bash：账户可登录，登陆后使用/bin/bash解释执行脚本
/bin/false：不可登录，不会有任何提示
/usr/sbin/nologin：不可登录，拒绝用户登录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-日志排查" tabindex="-1"><a class="header-anchor" href="#_10-日志排查" aria-hidden="true">#</a> 10.日志排查</h3><h4 id="系统日志" tabindex="-1"><a class="header-anchor" href="#系统日志" aria-hidden="true">#</a> 系统日志</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/etc/rsyslog.conf <span class="token comment">#查看各种系统日志文件所存放位置</span>

/var/log/btmp <span class="token comment">#此文件包含有关登录失败的信息。 //lastb</span>
/var/log/wtmp <span class="token comment">#文件记录所有用户的登录成功和注销的信息，同时记录了系统的启动、重启、关机事件。 //last</span>
/var/log/utmp <span class="token comment">#记录目前已经登陆的用户信息</span>
/var/log/lastlog <span class="token comment">#记录了用户最后一次登录时间。由于不是ascii文件。//lastlog</span>
/var/log/message <span class="token comment">#记录系统重要信息的日志</span>
/var/log/dmesg <span class="token comment">#内核的一些信息。</span>
/var/log/auth.log <span class="token comment">#此文件中包含系统授权信息，以及用户登录和使用的身份验证机制。 Ubuntu</span>
/var/log/secure <span class="token comment">#此文件中包含系统授权信息，以及用户登录和使用的身份验证机制。 Centos</span>
/var/log/boot.log <span class="token comment">#包含系统启动时记录的信息</span>
/var/log/kern.log <span class="token comment">#包含内核记录的信息。有助于解决定制内核的故障。</span>
/var/log/maillog和/var/log/mail.log <span class="token comment">#记录系统上运行的邮件服务器的信息。例如，sendmail将有关所有已发送项目的信息记录到此文件中。</span>
/var/log/mail/ <span class="token comment">#此子目录包含来自邮件服务器的其他日志，例如：sendmail将收集的邮件统计信息存储在/var/log/mail/statstics文件中。</span>
/var/log/user.log <span class="token comment">#包含有关所有用户级日志的信息。</span>
/var/log/Xorg.x.log <span class="token comment">#将来自x服务器的消息记录到此文件。</span>
/var/log/yum.log <span class="token comment">#包含使用yum安装包时记录的信息。在删除具有依赖项的包时，可以引用此文件。</span>
/var/log/cron <span class="token comment">#记录了系统定时任务相关的日志</span>
/var/log/secure <span class="token comment">#包含身份验证和授权权限相关的信息。例如，sshd在这里记录所有信息，包含登录失败。</span>
/var/log/faillog <span class="token comment">#包含失败的用户登录尝试。使用faillog命令显示此文件的内容。</span>
/var/log/httpd/ <span class="token comment">#包含apache web服务器access_logh和error_log以及相关的虚拟主机日志（如果设置为在此记录）</span>
/var/log/apache2 <span class="token comment">#包含apache web服务器access_logh和error_log以及相关的虚拟主机日志（如果设置为在此记录）</span>
/var/log/conman/-conman <span class="token comment">#客户端的日志文件。conman连接由conmand守护进程管理的远程控制台。</span>
/var/log/audit/ <span class="token comment">#包含由Linux审核守护程序（audit）存储的日志信息</span>
/var/log/settroubleshoot <span class="token comment">#/SELinux使用settroublishootd（SE TroubleshootDaemon）来通知文件安全上下文中的问题，并将这些信息记录在此日志文件中。</span>
/var/log/samba/ <span class="token comment">#包含samba存储的日志信息，用于将Windows连接到Linux。</span>
/var/log/sa <span class="token comment">#包含sysstat包收集的每日sar文件</span>
/var/log/cups <span class="token comment">#记录打印信息的日志</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.查看当前已经登录到系统的用户
w

<span class="token number">2</span>.查看所有用户最近一次登录
lastlog

<span class="token number">3</span>.过滤从未登录的用户
lastlog <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;Never logged in&quot;</span>

<span class="token number">4</span>.查看历史登录用户以及登录失败的用户
last

<span class="token number">5</span>.查看最近5个登录的用户。
last <span class="token parameter variable">-n</span> <span class="token number">5</span>

<span class="token number">6</span>.将IP地址转换为域名
last <span class="token parameter variable">-a</span> <span class="token parameter variable">-d</span> <span class="token operator">|</span><span class="token function">awk</span> -F<span class="token string">&#39; &#39;</span> <span class="token string">&#39;{print $1 &quot;\\t&quot; $NF}&#39;</span>

<span class="token number">7</span>.对登录系统的用户和ip进行排序计数。
last <span class="token parameter variable">-a</span> <span class="token operator">|</span><span class="token function">awk</span> -F<span class="token string">&#39; &#39;</span> <span class="token string">&#39;{ print $1 &quot;\\t&quot; $NF}&#39;</span> <span class="token operator">|</span><span class="token function">sort</span> <span class="token operator">|</span><span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span><span class="token function">sort</span> <span class="token parameter variable">-nr</span>

<span class="token number">8</span>.登入成功次数
<span class="token function">grep</span> <span class="token string">&quot;Accepted password for&quot;</span> /var/log/secure <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span> 

<span class="token number">9</span>.登入失败次数
<span class="token function">grep</span> <span class="token string">&quot;Failed password for&quot;</span>  /var/log/secure <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span> 

<span class="token number">10</span>.统计一共由多少个IP登录失败
<span class="token function">awk</span> <span class="token string">&#39;{if($6==&quot;Failed&quot;&amp;&amp;$7==&quot;password&quot;){if($9==&quot;invalid&quot;){ips[$13]++;users[$11]++}else{users[$9]++;ips[$11]++}}}END{for(ip in ips){print ip, ips[ip]}}&#39;</span> /var/log/secure <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span> 

<span class="token number">11</span>.分别统计每个IP登录失败的次数，并显示IP和失败次数
<span class="token function">awk</span> <span class="token string">&#39;{if($6==&quot;Failed&quot;&amp;&amp;$7==&quot;password&quot;){if($9==&quot;invalid&quot;){ips[$13]++;users[$11]++}else{users[$9]++;ips[$11]++}}}END{for(ip in ips){print ip, ips[ip]}}&#39;</span>  /var/log/secure <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k2</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">head</span> 

<span class="token function">grep</span> <span class="token string">&quot;Failed password&quot;</span> /var/log/secure <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{if(NF==16){c[$13]++}else{c[$11]++}}END{for(u in c)print u,c[u]}&#39;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k</span> <span class="token number">2</span> <span class="token parameter variable">-nr</span> <span class="token operator">|</span> <span class="token function">head</span>

<span class="token number">12</span>.将登录失败的IP导出到文件ip.log中。
<span class="token function">awk</span> <span class="token string">&#39;{if($6==&quot;Failed&quot;&amp;&amp;$7==&quot;password&quot;){if($9==&quot;invalid&quot;){ips[$13]++;users[$11]++}else{users[$9]++;ips[$11]++}}}END{for(ip in ips){print ip, ips[ip]}}&#39;</span> /var/log/secure <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k2</span> <span class="token parameter variable">-rn</span> <span class="token operator">&gt;</span> ip.log 

<span class="token number">13</span>.将ip.log的IP进行地理位置查询。
<span class="token function">head</span> <span class="token parameter variable">-10</span> ip.log <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $1&quot; &quot;;system(&quot;curl http://freeapi.ipip.net/&quot;$1);print(&quot;\\n&quot;)}&#39;</span>

<span class="token number">14</span>.统计攻击者枚举的用户名的次数
<span class="token function">awk</span> <span class="token string">&#39;{if($6==&quot;Failed&quot;&amp;&amp;$7==&quot;password&quot;){if($9==&quot;invalid&quot;){ips[$13]++;users[$11]++}else{users[$9]++;ips[$11]++}}}END{for(user in users){print user, users[user]}}&#39;</span> /var/log/secure <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k2</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>

<span class="token number">15</span>.查看攻击者枚举的失败用户名和使用次数
<span class="token function">awk</span> <span class="token string">&#39;{if($6==&quot;Failed&quot;&amp;&amp;$7==&quot;password&quot;){if($9==&quot;invalid&quot;){ips[$13]++;users[$11]++}else{users[$9]++;ips[$11]++}}}END{for(user in users){print user, users[user]}}&#39;</span> /var/log/secure <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k2</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">head</span>

<span class="token function">grep</span> <span class="token string">&quot;Failed password&quot;</span> /var/log/secure <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{if(NF==16){c[$11]++}else{c[$9]++}}END{for(u in c)print u,c[u]}&#39;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k</span> <span class="token number">2</span> <span class="token parameter variable">-nr</span> <span class="token operator">|</span> <span class="token function">head</span>

<span class="token number">16</span>.查看17:55:00有多少记录
<span class="token function">cat</span> secure <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;17:55:00&quot;</span>  <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="web日志" tabindex="-1"><a class="header-anchor" href="#web日志" aria-hidden="true">#</a> Web日志</h4><ul><li><p>tomcat日志</p><ul><li><p>catalina.out：这里包含tomcat运行自己输出的日志以及应用里向console输出的日志。</p></li><li><p>localhost.{yyyy-MM-dd}.log主要是应用初始化(listener, filter, servlet)未处理的异常最后被tomcat捕获而输出的日志,它也是包含tomcat的启动和暂停时的运行日志,但它没有catalina.2018-09-19.log 日志全。它只是记录了部分日志。</p></li><li><p>manager：项目专有的日志文件</p></li><li><p>localhost_access_log：访问tomcat的日志，请求时间和资源，状态码都有记录。</p></li></ul></li><li><p>apache日志、nginx日志、IIS日志</p><ul><li>access_log：访问日志，包含访问者的ip地址，浏览器信息，状态码等</li><li>error_log：错误日志</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Web日志排查
<span class="token number">1</span>.列出当天访问次数最多的IP
<span class="token function">cut</span> -d- <span class="token parameter variable">-f</span> <span class="token number">1</span> access_log <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-20</span>

<span class="token number">2</span>.查看每一个IP访问了多少个页面
<span class="token function">awk</span> <span class="token string">&#39;{++S[$1]} END {for (a in S) print a,S[a]}&#39;</span> access_log

<span class="token number">3</span>.查看某一页面被访问的次数
<span class="token function">grep</span> <span class="token string">&quot;/index.php&quot;</span> access_log <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>

<span class="token number">4</span>.查看某一IP访问了哪些页面
<span class="token function">grep</span> ^192.168.0.107 access_log<span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $1,$7}&#39;</span>

<span class="token number">5</span>.查看2023年2月7日17时这一个小时内有多少IP访问:
<span class="token function">awk</span> <span class="token string">&#39;{print $4,$1}&#39;</span> access_log <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">7</span>/Feb/2023:17 <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>

<span class="token number">6</span>.SQL注入攻击检测
<span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;select&quot;</span> 日志路径

<span class="token number">7</span>.xss跨站脚本攻击检测
<span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-i</span> <span class="token string">&quot; (S)%26%23x3c%3B(S+)%3E|(S)%26%23x3c%3B(S+)%2F%3E|(S+)&amp;#x3c;(S+)&gt;|(S+)&amp;#x3c;(S+)/&quot;</span> 日志路径

<span class="token number">8</span>.命令注入攻击检测
<span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;ping%20-c%20|ls%20|cat%20|%20pwd|net user&quot;</span> 日志路径

<span class="token number">9</span>.网站被植入webshell后门检测
<span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;eval|%eval|%execute|%3binsert|%20makewebtaski|/1.asp|/1.jsp|/1.php|/1.aspx%if&quot;</span> 日志路径

<span class="token number">10</span>.暴力破解账号攻击检测
<span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;login&quot;</span> /www/logs/access.log <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;POST&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;200&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-登陆排查" tabindex="-1"><a class="header-anchor" href="#_11-登陆排查" aria-hidden="true">#</a> 11.登陆排查</h3><h4 id="who-查看当前登录的用户" tabindex="-1"><a class="header-anchor" href="#who-查看当前登录的用户" aria-hidden="true">#</a> who (查看当前登录的用户)</h4><img src="`+E+'"><h4 id="w-显示已登陆的用户-且在执行的命令" tabindex="-1"><a class="header-anchor" href="#w-显示已登陆的用户-且在执行的命令" aria-hidden="true">#</a> w(显示已登陆的用户，且在执行的命令)</h4><img src="'+T+'"><h4 id="last-显示系统中用户的登录和登出记录" tabindex="-1"><a class="header-anchor" href="#last-显示系统中用户的登录和登出记录" aria-hidden="true">#</a> last(显示系统中用户的登录和登出记录)</h4><img src="'+C+'"><h4 id="lastb-查看最近登录失败的用户" tabindex="-1"><a class="header-anchor" href="#lastb-查看最近登录失败的用户" aria-hidden="true">#</a> lastb(查看最近登录失败的用户)</h4><img src="'+I+'"><h4 id="lastlog-查看所有用户最近登录的时间" tabindex="-1"><a class="header-anchor" href="#lastlog-查看所有用户最近登录的时间" aria-hidden="true">#</a> lastlog (查看所有用户最近登录的时间)</h4><img src="'+R+'"><h4 id="cat-etc-passwd-查看所有用户账户信息" tabindex="-1"><a class="header-anchor" href="#cat-etc-passwd-查看所有用户账户信息" aria-hidden="true">#</a> cat /etc/passwd(查看所有用户账户信息)</h4><img src="'+D+'"><h4 id="awk-f-3-0-print-1-etc-passwd-查看超级用户-uid-0" tabindex="-1"><a class="header-anchor" href="#awk-f-3-0-print-1-etc-passwd-查看超级用户-uid-0" aria-hidden="true">#</a> awk -F: &#39;$3==0{print $1}&#39; /etc/passwd 查看超级用户(uid=0)</h4><img src="'+U+`"><h3 id="_12-启动项排查" tabindex="-1"><a class="header-anchor" href="#_12-启动项排查" aria-hidden="true">#</a> 12.启动项排查</h3><ul><li>chkconfig --list 列出所有开机启动项</li><li>ls -alt /etc/init.d/ 排查开机启动</li></ul><p>主要排查的启动项有：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/etc/rc
/etc/rc.local
<span class="token comment">#这两个文件类型，每次开机都会执行里面的命令</span>

/etc/rc.d/init.d <span class="token comment">#这个目录下面放了可执行的脚本或文件</span>
/etc/init.d 是 /etc/rc.d/init.d 的软链接

/etc/rc*.d/

/etc/rc.d/rc

/etc/rc.d/rc.local

/etc/rc.d/rc

/etc/init/*.conf

/etc/rc<span class="token variable">$runlevel</span>.d/

/etc/profile

/etc/profile.d/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_13-排查环境变量" tabindex="-1"><a class="header-anchor" href="#_13-排查环境变量" aria-hidden="true">#</a> 13. 排查环境变量</h3><h4 id="登录文件" tabindex="-1"><a class="header-anchor" href="#登录文件" aria-hidden="true">#</a> 登录文件</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token environment constant">$PATH</span> <span class="token comment">#查看当前环境变量</span>

<span class="token comment">#这些文件用于设置系统环境变量或启动程序，每次linux登入或切换用户都会触发这些文件。</span>
/etc/profile
/etc/bashrc
/etc/bash.bashrc
~/.bashrc
~/.profile
~/.bash_profile

<span class="token comment">#Linux登入环境变量触发顺序，切换用户时也会触发环境变量文件。</span>
登入
↓
/etc/bash.bashrc或/etc/bashrc
↓
/etc/profile
↓
~/.bashrc
↓
~/.profile
↓
登录成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="bash-logout" tabindex="-1"><a class="header-anchor" href="#bash-logout" aria-hidden="true">#</a> ~/.bash_logout</h4><ul><li>登出账户时触发。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># exit</span>
登出
hacker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_14-排查rootkit" tabindex="-1"><a class="header-anchor" href="#_14-排查rootkit" aria-hidden="true">#</a> 14.排查RootKit</h3><ul><li>RootKit是一个隐藏其他程序进程的软件，可能是一个或一个以上的软件组合。在今天，RootKit一词更多的是被作为驱动程序，加载到操作系统内核中的恶意软件。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>安装RootKit检测软件：Chkrootkit

Centos:
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc<span class="token punctuation">;</span>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc-c++<span class="token punctuation">;</span>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc-c++

debian:
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc-c++<span class="token punctuation">;</span><span class="token function">apt-get</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">make</span>

https://gpu.xuandashi.com/12083.html

<span class="token function">sudo</span> chkrootkit <span class="token comment">#执行chkrootkit</span>

安装RootKit检测软件：rkhunter
<span class="token function">wget</span> http://jaist.dl.sourceforge.net/project/rkhunter/rkhunter/1.4.6/rkhunter-1.4.6.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-zxf</span> rkhunter-1.4.6.tar.gz 
<span class="token builtin class-name">cd</span> rkhunter-1.4.6/
<span class="token function">sudo</span> ./installer.sh <span class="token parameter variable">--install</span>
 
<span class="token function">sudo</span> <span class="token function">cp</span> /usr/local/bin/rkhunter /usr/sbin/ <span class="token comment">#添加至环境变量</span>
<span class="token function">sudo</span> rkhunter <span class="token parameter variable">--check</span> <span class="token comment">#执行rkhunter</span>

<span class="token punctuation">[</span>hzy@localhost rkhunter-1.4.6<span class="token punctuation">]</span>$ <span class="token function">sudo</span> rkhunter <span class="token parameter variable">--check</span>
<span class="token punctuation">[</span> Rootkit Hunter version <span class="token number">1.4</span>.6 <span class="token punctuation">]</span>

Checking system commands<span class="token punctuation">..</span>.

  Performing <span class="token string">&#39;strings&#39;</span> <span class="token builtin class-name">command</span> checks
    Checking <span class="token string">&#39;strings&#39;</span> <span class="token builtin class-name">command</span>                               <span class="token punctuation">[</span> OK <span class="token punctuation">]</span>

  Performing <span class="token string">&#39;shared libraries&#39;</span> checks
    Checking <span class="token keyword">for</span> preloading variables                        <span class="token punctuation">[</span> None found <span class="token punctuation">]</span>
    Checking <span class="token keyword">for</span> preloaded libraries                         <span class="token punctuation">[</span> None found <span class="token punctuation">]</span>
    Checking LD_LIBRARY_PATH variable                        <span class="token punctuation">[</span> Not found <span class="token punctuation">]</span>

  Performing <span class="token function">file</span> properties checks
    Checking <span class="token keyword">for</span> prerequisites                               <span class="token punctuation">[</span> Warning <span class="token punctuation">]</span>
    /usr/sbin/adduser                                        <span class="token punctuation">[</span> OK <span class="token punctuation">]</span>
    /usr/sbin/chkconfig                                      <span class="token punctuation">[</span> OK <span class="token punctuation">]</span>
    /usr/sbin/chroot                                         <span class="token punctuation">[</span> OK <span class="token punctuation">]</span>
    /usr/sbin/depmod                                         <span class="token punctuation">[</span> OK <span class="token punctuation">]</span>
如果发现可疑文件，直接rm <span class="token parameter variable">-rf</span> 路径。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="隐藏的rootkit如何删除" tabindex="-1"><a class="header-anchor" href="#隐藏的rootkit如何删除" aria-hidden="true">#</a> 隐藏的rootkit如何删除？</h5><p>Rookit在内核中找不到，那么就存在删除不掉的可能，这时候需要将感染系统以文件挂载到其他linux机器上，进行清除操作</p><h3 id="_15-排查网络带宽" tabindex="-1"><a class="header-anchor" href="#_15-排查网络带宽" aria-hidden="true">#</a> 15.排查网络带宽</h3><ul><li><p>网络流量上下行是否异常，某服务器上行流量比往常高出几倍时，说明在外发大量的数据，重点检查是否为正常业务。</p></li><li><p>查看网络带宽占用需要安装软件辅助，应急时大部分都不许随意安装软件，这时候就需要和运维的网络沟通，看设备的流量。</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iftop源码安装
<span class="token function">wget</span> http://www.ex-parrot.com/~pdw/iftop/download/iftop-0.17.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-xvzf</span> iftop-0.17.tar.gz
yum <span class="token function">install</span> flex byacc  libpcap ncurses ncurses-devel libpcap-devel
<span class="token builtin class-name">cd</span> iftop-0.17
./configure <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>

安装好了使用sudo iftop找不到命令，iftop执行说没有权限的话使用：
<span class="token function">sudo</span> <span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> ^<span class="token environment constant">PATH</span> <span class="token comment">#查看PATH环境变量</span>
<span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-s</span> /root/app/iftop-0.17/iftop /usr/sbin/ <span class="token comment">#添加软连接到这个目录</span>

<span class="token function">sudo</span> iftop <span class="token parameter variable">-i</span> ens33 <span class="token parameter variable">-P</span> <span class="token comment">#指定ens33网卡，分析流量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用iftop命令分析网络时，需要指定网卡，一个服务器可能有多张网卡，需要与运维沟通区分各个网卡的用途。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost iftop-0.17<span class="token punctuation">]</span><span class="token comment"># ifconfig</span>
ens33: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">192.168</span>.0.120  netmask <span class="token number">255.255</span>.255.0  broadcast <span class="token number">192.168</span>.0.255
        inet6 fe80::613c:ab5b:a5ec:148a  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether 00:0c:29:42:b9:cc  txqueuelen <span class="token number">1000</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">211399</span>  bytes <span class="token number">302360561</span> <span class="token punctuation">(</span><span class="token number">288.3</span> MiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">105118</span>  bytes <span class="token number">7870076</span> <span class="token punctuation">(</span><span class="token number">7.5</span> MiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

lo: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">7</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,LOOPBACK,RUNNING<span class="token operator">&gt;</span>  mtu <span class="token number">65536</span>
        inet <span class="token number">127.0</span>.0.1  netmask <span class="token number">255.0</span>.0.0
        inet6 ::1  prefixlen <span class="token number">128</span>  scopeid 0x1<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>host<span class="token operator">&gt;</span>
        loop  txqueuelen <span class="token number">1000</span>  <span class="token punctuation">(</span>Local Loopback<span class="token punctuation">)</span>
        RX packets <span class="token number">64</span>  bytes <span class="token number">5568</span> <span class="token punctuation">(</span><span class="token number">5.4</span> KiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">64</span>  bytes <span class="token number">5568</span> <span class="token punctuation">(</span><span class="token number">5.4</span> KiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

virbr0: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">409</span><span class="token operator"><span class="token file-descriptor important">9</span>&lt;</span>UP,BROADCAST,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">192.168</span>.122.1  netmask <span class="token number">255.255</span>.255.0  broadcast <span class="token number">192.168</span>.122.255
        ether <span class="token number">52</span>:54:00:a6:15:80  txqueuelen <span class="token number">1000</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

<span class="token punctuation">[</span>hzy@localhost iftop-0.17<span class="token punctuation">]</span>$ <span class="token function">sudo</span> iftop <span class="token parameter variable">-i</span> ens33 <span class="token parameter variable">-P</span> <span class="token comment">#指定ens33网卡，分析流量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_16-使用gscan排查" tabindex="-1"><a class="header-anchor" href="#_16-使用gscan排查" aria-hidden="true">#</a> 16.使用GScan排查</h3><h3 id="_17-工具排查" tabindex="-1"><a class="header-anchor" href="#_17-工具排查" aria-hidden="true">#</a> 17.工具排查</h3><ul><li>病毒分析</li></ul>`,143),M={href:"http://www.xuetr.com",target:"_blank",rel:"noopener noreferrer"},A={href:"https://www.huorong.cn",target:"_blank",rel:"noopener noreferrer"},L={href:"https://docs.microsoft.com/zh-cn/sysinternals/downloads/process-explorer",target:"_blank",rel:"noopener noreferrer"},O={href:"https://processhacker.sourceforge.io/downloads.php",target:"_blank",rel:"noopener noreferrer"},z={href:"https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns",target:"_blank",rel:"noopener noreferrer"},F={href:"https://www.bleepingcomputer.com/download/otl/",target:"_blank",rel:"noopener noreferrer"},B={href:"http://download.eset.com.cn/download/detail/?product=sysinspector",target:"_blank",rel:"noopener noreferrer"},K=n("ul",null,[n("li",null,"病毒查杀")],-1),V={href:"http://devbuilds.kaspersky-labs.com/devbuilds/KVRT/latest/full/KVRT.exe",target:"_blank",rel:"noopener noreferrer"},X={href:"http://free.drweb.ru/download+cureit+free",target:"_blank",rel:"noopener noreferrer"},G={href:"https://www.huorong.cn",target:"_blank",rel:"noopener noreferrer"},H={href:"http://sd.360.cn/download_center.html",target:"_blank",rel:"noopener noreferrer"},W=n("ul",null,[n("li",null,"威胁情报平台")],-1),Y={href:"http://www.cverc.org.cn",target:"_blank",rel:"noopener noreferrer"},Z={href:"http://bbs.huorong.cn/forum-59-1.html",target:"_blank",rel:"noopener noreferrer"},J={href:"https://x.threatbook.com/",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://www.virustotal.com/gui/home/upload",target:"_blank",rel:"noopener noreferrer"},nn={href:"https://ti.dbappsecurity.com.cn/?ivk_sa=1024320u",target:"_blank",rel:"noopener noreferrer"},sn={href:"https://ti.sangfor.com.cn/analysis-platform",target:"_blank",rel:"noopener noreferrer"},an={href:"https://www.venuseye.com.cn/",target:"_blank",rel:"noopener noreferrer"},en={href:"https://ti.360.cn/#/homepage",target:"_blank",rel:"noopener noreferrer"},ln={href:"https://www.threatminer.org/",target:"_blank",rel:"noopener noreferrer"},tn=n("ul",null,[n("li",null,"在线病毒扫描网站")],-1),rn={href:"http://www.virscan.org",target:"_blank",rel:"noopener noreferrer"},pn={href:"https://habo.qq.com",target:"_blank",rel:"noopener noreferrer"},on={href:"https://virusscan.jotti.org",target:"_blank",rel:"noopener noreferrer"},cn={href:"http://www.scanvir.com",target:"_blank",rel:"noopener noreferrer"},dn=n("ul",null,[n("li",null,"webshell查杀")],-1),un={href:"http://www.d99net.net/index.asp",target:"_blank",rel:"noopener noreferrer"},mn={href:"http://www.shellpub.com",target:"_blank",rel:"noopener noreferrer"},vn={href:"http://edr.sangfor.com.cn/backdoor_detection.html",target:"_blank",rel:"noopener noreferrer"},bn={href:"https://n.shellpub.com/",target:"_blank",rel:"noopener noreferrer"},kn=n("ul",null,[n("li",null,"在线沙箱分析")],-1),hn={href:"https://ata.360.net/dashboard",target:"_blank",rel:"noopener noreferrer"},fn={href:"https://s.threatbook.cn/",target:"_blank",rel:"noopener noreferrer"},gn={href:"https://www.maldun.com/submit/submit_file/",target:"_blank",rel:"noopener noreferrer"};function _n(wn,xn){const a=p("ExternalLinkIcon");return l(),t("div",null,[j,n("p",null,[s("PCHunter："),n("a",M,[s("http://www.xuetr.com"),e(a)])]),n("p",null,[s("火绒剑："),n("a",A,[s("https://www.huorong.cn"),e(a)])]),n("p",null,[s("Process Explorer："),n("a",L,[s("https://docs.microsoft.com/zh-cn/sysinternals/downloads/process-explorer"),e(a)])]),n("p",null,[s("processhacker："),n("a",O,[s("https://processhacker.sourceforge.io/downloads.php"),e(a)])]),n("p",null,[s("autoruns："),n("a",z,[s("https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns"),e(a)])]),n("p",null,[s("OTL："),n("a",F,[s("https://www.bleepingcomputer.com/download/otl/"),e(a)])]),n("p",null,[s("SysInspector："),n("a",B,[s("http://download.eset.com.cn/download/detail/?product=sysinspector"),e(a)])]),K,n("p",null,[s("卡巴斯基："),n("a",V,[s("http://devbuilds.kaspersky-labs.com/devbuilds/KVRT/latest/full/KVRT.exe"),e(a)])]),n("p",null,[s("大蜘蛛："),n("a",X,[s("http://free.drweb.ru/download+cureit+free"),e(a)])]),n("p",null,[s("火绒安全软件："),n("a",G,[s("https://www.huorong.cn"),e(a)])]),n("p",null,[s("360杀毒："),n("a",H,[s("http://sd.360.cn/download_center.html"),e(a)])]),W,n("p",null,[s("CVERC-国家计算机病毒应急处理中心："),n("a",Y,[s("http://www.cverc.org.cn"),e(a)])]),n("p",null,[s("火绒安全论坛："),n("a",Z,[s("http://bbs.huorong.cn/forum-59-1.html"),e(a)])]),n("p",null,[n("a",J,[s("微步在线X情报社区-威胁情报查询_威胁分析平台_开放社区 (threatbook.com)"),e(a)])]),n("p",null,[n("a",Q,[s("VirusTotal - Home"),e(a)])]),n("p",null,[n("a",nn,[s("安全星图平台 (dbappsecurity.com.cn)"),e(a)])]),n("p",null,[n("a",sn,[s("深信服威胁情报中心 (sangfor.com.cn)"),e(a)])]),n("p",null,[n("a",an,[s("VenusEye威胁情报中心"),e(a)])]),n("p",null,[n("a",en,[s("https://ti.360.cn/#/homepage"),e(a)])]),n("p",null,[n("a",ln,[s("ThreatMiner.org | Data Mining for Threat Intelligence"),e(a)])]),tn,n("p",null,[s("多引擎在线病毒扫描网："),n("a",rn,[s("http://www.virscan.org"),e(a)])]),n("p",null,[s("腾讯哈勃分析系统："),n("a",pn,[s("https://habo.qq.com"),e(a)])]),n("p",null,[s("Jotti恶意软件扫描系统："),n("a",on,[s("https://virusscan.jotti.org"),e(a)])]),n("p",null,[s("针对计算机病毒、手机病毒、可疑文件等进行检测分析："),n("a",cn,[s("http://www.scanvir.com"),e(a)])]),dn,n("p",null,[s("D盾_Web查杀："),n("a",un,[s("http://www.d99net.net/index.asp"),e(a)])]),n("p",null,[s("河马webshell查杀："),n("a",mn,[s("http://www.shellpub.com"),e(a)])]),n("p",null,[s("深信服Webshell网站后门检测工具："),n("a",vn,[s("http://edr.sangfor.com.cn/backdoor_detection.html"),e(a)])]),n("p",null,[n("a",bn,[s("SHELLPUB.COM在线查杀"),e(a)])]),kn,n("p",null,[s("360安全大脑沙箱云："),n("a",hn,[s("https://ata.360.net/dashboard"),e(a)]),s(" 微步云沙箱："),n("a",fn,[s("https://s.threatbook.cn/"),e(a)]),s(" 魔盾安全分析："),n("a",gn,[s("https://www.maldun.com/submit/submit_file/"),e(a)])])])}const qn=i(N,[["render",_n],["__file","LInux应急响应.html.vue"]]);export{qn as default};
