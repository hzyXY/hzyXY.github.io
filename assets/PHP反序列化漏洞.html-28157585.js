import{_ as n,W as s,X as a,a1 as t}from"./framework-b6a07282.js";const e="/assets/1-b1101e53.jpg",i="/assets/2-5a5dc573.jpg",l="/assets/3-bc9ab5dd.jpg",p={},o=t(`<h2 id="php反序列化漏洞" tabindex="-1"><a class="header-anchor" href="#php反序列化漏洞" aria-hidden="true">#</a> PHP反序列化漏洞</h2><h3 id="什么是序列化和反序列化" tabindex="-1"><a class="header-anchor" href="#什么是序列化和反序列化" aria-hidden="true">#</a> 什么是序列化和反序列化？</h3><ul><li><p>对象的状态信息转换为可以存储或传输的形式的过程。在序列化期间，对象将当前的状态写入到临时或持久性的存储区 ，将状态信息保存为<strong>字符串</strong></p></li><li><p>将字符串转换为<strong>状态信息</strong></p></li><li><p>序列化的的两个函数：</p><ul><li>序列化 serialize()</li><li>反序列化 unserialize()</li></ul></li></ul><h3 id="php序列化和反序列化" tabindex="-1"><a class="header-anchor" href="#php序列化和反序列化" aria-hidden="true">#</a> PHP序列化和反序列化</h3><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">test</span><span class="token punctuation">{</span>             <span class="token comment">//定义类</span>
    <span class="token keyword">public</span> <span class="token variable">$name</span> <span class="token operator">=</span> <span class="token string double-quoted-string">&quot;xy&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token variable">$age</span> <span class="token operator">=</span> <span class="token string double-quoted-string">&quot;22&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token variable">$class</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//定义对象</span>
<span class="token variable">$class_ser</span> <span class="token operator">=</span> <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token variable">$class</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//序列化对象</span>
<span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$class_ser</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//输出序列化后的对象</span>
<span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;&lt;br&gt;&quot;</span><span class="token punctuation">;</span>
<span class="token variable">$class_unser</span> <span class="token operator">=</span> <span class="token function">unserialize</span><span class="token punctuation">(</span><span class="token variable">$class_ser</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//反序列化</span>
<span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$class_unser</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//输出反序列化</span>
<span class="token delimiter important">?&gt;</span></span> 
    
    
#序列化输出结果：O:4:&quot;test&quot;:2:{s:4:&quot;name&quot;;s:2:&quot;xy&quot;;s:3:&quot;age&quot;;s:2:&quot;22&quot;;}
#反序列化输出结果：
    test Object
(
    [name] =&gt; xy
    [age] =&gt; 22
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="魔术方法" tabindex="-1"><a class="header-anchor" href="#魔术方法" aria-hidden="true">#</a> 魔术方法</h3><ul><li>魔术方法是PHP面向对象中特有的特性。它们在特定的情况下被触发，都是以双下划线开头，利用魔术方法可以轻松实现PHP面向对象中重载（Overloading即动态创建类属性和方法）。 <strong>问题就出现在重载过程中，执行了相关代码。</strong></li></ul><h4 id="常见的魔术方法" tabindex="-1"><a class="header-anchor" href="#常见的魔术方法" aria-hidden="true">#</a> 常见的魔术方法</h4><ul><li>__construct() :构造函数，当创建对象时自动调用。</li><li>__destruct():析构函数，在对象的所有引用都被删除时或者对象被显式销毁时调用，当对象被销毁时自动调用。</li><li>__wakeup():进行unserialize时会查看是否有该函数，有的话优先调用。会进行初始化对象。</li><li>__toString():当一个类被当成字符串时会被调用。</li><li>__sleep():当一个对象被序列化时调用，可与设定序列化时保存的属性。</li></ul><table><thead><tr><th style="text-align:left;">方法</th><th style="text-align:left;">作用</th></tr></thead><tbody><tr><td style="text-align:left;">__construct()</td><td style="text-align:left;">创建对象时触发（定义构造方法）</td></tr><tr><td style="text-align:left;">__destruct()</td><td style="text-align:left;">对象被销毁时触发（定义析构方法）</td></tr><tr><td style="text-align:left;">__call()</td><td style="text-align:left;">在对象上下文调用不可访问的方法时触发</td></tr><tr><td style="text-align:left;">__callStatic()</td><td style="text-align:left;">在静态上下文中调用不可访问的方法时触发</td></tr><tr><td style="text-align:left;">__get()</td><td style="text-align:left;">用于从不可访问的属性读取数据</td></tr><tr><td style="text-align:left;">__set()</td><td style="text-align:left;">用于将数据写入不可访问的属性</td></tr><tr><td style="text-align:left;">__isset()</td><td style="text-align:left;">在不可访问的属性上调用isset()或empty()触发</td></tr><tr><td style="text-align:left;">__unset()</td><td style="text-align:left;">在不可访问的属性上使用unset()时触发</td></tr><tr><td style="text-align:left;">__invoke()</td><td style="text-align:left;">当脚本尝试将对象调用为函数时触发</td></tr><tr><td style="text-align:left;">__sleep()</td><td style="text-align:left;">serialize() 函数会检查类中是否存在一个魔术方法 __sleep()，如果存在，该方法会先被调用，然后才执行序列化操作</td></tr><tr><td style="text-align:left;">__wakeup()</td><td style="text-align:left;">unserialize() 会检查是否存在一个 __wakeup() 方法。如果存在，则会先调用该方法。影响版本：PHP5 &lt; 5.6.25 ，PHP7 &lt; 7.0.10</td></tr></tbody></table><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
  <span class="token keyword">class</span> <span class="token class-name-definition class-name">Stu</span><span class="token punctuation">{</span>
       <span class="token keyword">public</span> <span class="token variable">$name</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;xy&#39;</span><span class="token punctuation">;</span>
       <span class="token keyword">public</span> <span class="token variable">$age</span> <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>
       
      <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">&#39;对象被创建了__consrtuct()&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">function</span> <span class="token function-definition function">__wakeup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">&#39;执行了反序列化__wakeup()&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>     
       <span class="token keyword">function</span> <span class="token function-definition function">__toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">&#39;对象被当做字符串输出__toString&#39;</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string single-quoted-string">&#39;asdsadsad&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">function</span> <span class="token function-definition function">__sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">&#39;执行了序列化__sleep&#39;</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;age&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">function</span> <span class="token function-definition function">__destruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">&#39;对象被销毁了__destruct()&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> 
    <span class="token variable">$stu</span> <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">Stu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;&lt;pre&gt;&quot;</span><span class="token punctuation">;</span>
   <span class="token comment">//序列化</span>
    <span class="token variable">$stu_ser</span> <span class="token operator">=</span> <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token variable">$stu</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$stu_ser</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//当成字符串输出</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;<span class="token interpolation"><span class="token variable">$stu</span></span>&quot;</span><span class="token punctuation">;</span>
   <span class="token comment">//反序列化</span>
    <span class="token variable">$stu_unser</span> <span class="token operator">=</span> <span class="token function">unserialize</span><span class="token punctuation">(</span><span class="token variable">$stu_ser</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$stu_unser</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="序列化内容解释" tabindex="-1"><a class="header-anchor" href="#序列化内容解释" aria-hidden="true">#</a> 序列化内容解释</h4><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">TEST</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token variable">$a</span><span class="token operator">=</span><span class="token string double-quoted-string">&quot;public&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token variable">$b</span><span class="token operator">=</span><span class="token string double-quoted-string">&quot;private&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">protected</span> <span class="token variable">$c</span><span class="token operator">=</span><span class="token string double-quoted-string">&quot;protected&quot;</span><span class="token punctuation">;</span>
	<span class="token keyword">static</span> <span class="token variable">$d</span><span class="token operator">=</span><span class="token string double-quoted-string">&quot;static&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token variable">$aaa</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">TEST</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">echo</span> <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token variable">$aaa</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token delimiter important">?&gt;</span></span>

输出：
O:4:&quot;TEST&quot;:3{s:1:&quot;a&quot;;s:6:&quot;public&quot;;s:7:&quot;TESTb&quot;;s:7:&quot;private&quot;;s:4:&quot;*c&quot;;s:9:&quot;protected&quot;;}

第一部分：O:4:&quot;TEST&quot;:3
O:		表示这是一个对象
4:		对象的名称TEST有4个字符
TEST:	对象的名称
3:		对象属性的个数（不包含static）
 
第二部分：s:1:&quot;a&quot;;s:6:&quot;public&quot;;
s:		变量名数据类型为string
1:		变量a的名字长度
a:		变量名称
s:		变量值的数据类型
6:		变量值的长度
public:	变量的值
    
第三部分：s:7:&quot;TESTb&quot;;s:7:&quot;private&quot;;
s:		变量名的数据类型
7:		变量名的长度（private属性序列化会在变量名前加标记%00classname%00，长度=类名长度+变量名长度+2）
TESTb:	变量名称（private属性的变量名在序列化时会加上类名，即类名+变量名）
s:		变量值的数据类型
7:		变量值的长度
private:变量的值
    
第四部分：s:4:&quot;*c&quot;;s:9:&quot;protected&quot;;
s:		变量名数据类型
4:		变量名长度
*c:		变量名称（protected属性的变量名会在序列化时会在变量名前加上一个&quot; %00*%00&quot;，长度=变量名长度+3）
s:		变量值的数据类型
9:		变量值的长度
protected:变量的值
    
小知识：
public(公有)：公有的类成员可以在任何地方被访问。
protected(受保护)：受保护的类成员则可以被其自身以及其子类和父类访问。
private(私有)：私有的类成员则只能被其定义所在的类访问。
	类属性必须定义为公有，受保护，私有之一。如果用 var 定义，则被视为公有。
	static：静态属性单独存在类中（属于类），不属于对象。因此只要类声明完毕，该属性就存在。既访问该静态属性不需要依赖于对象就可以访问，static 在类中一直有，因此他被所有对象共享，一人影响，其他共享。
	普通方法存放在类种，在内存中只有1份。静态方法也如此。 区别 ：普通方法需要对象去调用，需绑 t h i s 。 静 态 方 法 不 需 要 绑 定 this。 静态方法不需要绑定 this。静态方法不需要绑定this，则通过类名即可调用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反序列化漏洞的利用" tabindex="-1"><a class="header-anchor" href="#反序列化漏洞的利用" aria-hidden="true">#</a> 反序列化漏洞的利用</h3><ul><li>由于反序列化时unserialize()函数会自动调用wakeup(),destruct(),函数，当有一些漏洞或者恶意代码在这些函数中，当我们控制序列化的字符串时会去触发他们，从而达到攻击。</li></ul><h4 id="cve-2016-7124" tabindex="-1"><a class="header-anchor" href="#cve-2016-7124" aria-hidden="true">#</a> CVE-2016-7124</h4><ul><li><p>漏洞影响版本</p><p>PHP5 &lt; 5.6.25</p><p>PHP7 &lt; 7.0.10</p></li><li><p>如果类中存在__wakeup方法，调用 unserilize() 方法前则先调用__wakeup方法，当序列化字符串中表示对象属性个数的值大于 真实的属性个数时会跳过__wakeup的执行</p></li></ul><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token function">header</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;Content-Type: text/html; charset=utf-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">cve_2016_7124</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token variable">$name</span> <span class="token operator">=</span> <span class="token string double-quoted-string">&quot;__wakeup()rg&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__wakeup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;this is __wakeup&lt;br/&gt;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__destruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;this is __destruct&lt;br/&gt;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//$a = new cve_2016_7124();</span>
<span class="token comment">//echo serialize($a);</span>
<span class="token comment">//O:13:&quot;cve_2016_7124&quot;:1:{s:4:&quot;name&quot;;s:12:&quot;__wakeup()rg&quot;;}</span>

<span class="token variable">$a</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$a</span> <span class="token operator">=</span> <span class="token function">str_replace</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;\\\\&quot;</span><span class="token punctuation">,</span><span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">,</span><span class="token variable">$a</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//通过浏览器传入的数据，特殊符号会自动转义，所以这里使用str_replace过滤掉\\</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token function">unserialize</span><span class="token punctuation">(</span><span class="token variable">$a</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token delimiter important">?&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>序列化后的结果</li></ul><img src="`+e+'"><ul><li>进行反序列化，__wakeup和__destruct都执行了。</li></ul><img src="'+i+'"><ul><li>当表示对象属性个数的值大于真实个数时，__wakeup函数不执行</li></ul><img src="'+l+'"><h4 id="防御" tabindex="-1"><a class="header-anchor" href="#防御" aria-hidden="true">#</a> 防御</h4><ol><li>针对unserialize和Magic函数进行审计</li><li>对用户输入的内容进行过滤</li><li>制定白名单，限制反学列话的类，不能动态传参</li></ol>',26),c=[o];function u(d,r){return s(),a("div",null,c)}const v=n(p,[["render",u],["__file","PHP反序列化漏洞.html.vue"]]);export{v as default};
