var posts=["2023/12/06/md常用语法/","2023/10/09/Hello-fufu/","2024/02/12/LaTex食用指南/","2023/10/10/poems/","2023/12/06/基于openCV的图片查看器/","2023/12/06/基于openCV的视频查看器/","2024/08/22/如何在本地部署Echarts/","2024/06/23/数字电路实验————数字钟/","2024/03/12/用python实现的exr文件通道检测与数据统计/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };