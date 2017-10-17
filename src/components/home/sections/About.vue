<template>
  <div id="about">
    <div class="content">
      <div class="about-image" id="about-image"></div>
      <div class="about-content">
        <div class="title">
          Dentistry for the modern world!
        </div>
        <div class="text">
          Oral Data Link database of dentists around the United States is distributed on the Ethereum public blockchain. This makes it much convenient to access any of our dentists for professional dental services that are technologically modern. Our platform is accessible to everyone.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  props: [ 'withinTheBlockchainVector' ],
  mounted: function () {
    const aboutImage = document.getElementById('about-image')
    aboutImage.appendChild(new DOMParser().parseFromString(this.withinTheBlockchainVector, 'text/html').body.firstChild)
  }
}
</script>

<style scoped>
#about {
  width: 100%;
  height: 648px;
  background: #ffffff;
  margin-top: 0px;
}

.content {
  height: 100%;
  width: 100%;
  max-width: 920px;
  color: #404040;
  margin: auto;
}

.about-image {
  clear: none;
  float: left;
  height: 300px;
  width: 300px;
  margin-top: 174px;
}

.about-content {
  clear: none;
  float: left;
  height: 150px;
  width: 550px;
  margin: 249px 0px 0px 70px;
  font-size: 15px;
}

.title {
  font-size: 30px;
  height: 40px;
  margin-bottom: 10px;
}

.text {
  height: 100px;
  text-align: justify;
}
</style>
