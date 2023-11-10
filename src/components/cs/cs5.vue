<template>
  <div class="container">
    <div class="header">
      <h1>{{ resume.name }}</h1>
      <p>{{ resume.title }}</p>
    </div>
    <div class="profile">
      <h2>个人简介</h2>
      <p>{{ resume.profile }}</p>
    </div>
    <div class="experience">
      <h2>工作经验</h2>
      <div v-for="job in resume.experience" :key="job.company">
        <p class="job-title">{{ job.title }}</p>
        <p class="company">{{ job.company }}</p>
        <p class="date">{{ job.dates }}</p>
        <ul>
          <li v-for="duty in job.duties" :key="duty">{{ duty }}</li>
        </ul>
      </div>
    </div>
    <div class="education">
      <h2>教育背景</h2>
      <div v-for="education in resume.education" :key="education.institution">
        <p class="education-title">{{ education.degree }}</p>
        <p class="institution">{{ education.institution }}</p>
        <p class="date">{{ education.dates }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Resume",
  data() {
    return {
      resume: {
        name: "张三",
        title: "Web前端开发 | 程序员 | 黑客",
        profile:
          "拥有6年计算机编程经验的创新技术头脑。能够使用多种技术和软件解决方案，管理数据库。是团队中能够诊断问题并开发解决方案的宝贵成员。",
        experience: [
          {
            title: "高级Web开发人员",
            company: "技术解决方案公司",
            dates: "2018年3月 - 至今",
            duties: [
              "主导使用PHP、JavaScript和HTML的关键公司项目的开发工作。",
              "管理开发团队为金融、医疗和教育等多个行业创建产品。",
            ],
          },
          // 更多经验...
        ],
        education: [
          {
            degree: "计算机科学学士学位",
            institution: "州立大学",
            dates: "2009年 - 2013年",
          },
          // 更多教育...
        ],
      },
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  color: #3cff00;
  background-color: #101010;
  font-family: "微软雅黑", "宋体", sans-serif;
}
.header {
  text-align: center;
  border-bottom: 1px solid #3cff00;
}
.header h1 {
  font-size: 2.5em;
}
.job-title,
.education-title {
  font-weight: bold;
  font-size: 1.2em;
}
.company,
.institution {
  font-style: italic;
}
.date {
  text-align: right;
  font-style: italic;
}
</style>
