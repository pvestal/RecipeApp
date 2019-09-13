<template>
  <v-app id="cards">
      <v-card class="mx-auto" max-width="400" v-for="(item, index) in items" :key="index" :to="item.id">
        <v-img class="white--text" height="200px" :src="item.imgUrl">
          <v-card-title class="align-end fill-height text--white">{{item.title}}</v-card-title>
        </v-img>

        <v-card-text>
          <span>{{item.category}}</span>
          <br />
          <span class="text--primary">
            <span>{{item.description}}</span>
            <br />
            <!--           <span>Whitsunday Island, Whitsunday Islands</span> -->
          </span>
        </v-card-text>

        <v-card-actions>
          <v-btn text color="blue">EXPLORE</v-btn>
          <v-btn text color="blue">SHARE</v-btn>
        </v-card-actions>
      </v-card>
    </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      {id: '8jh287asd', title: 'Spaetzle', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Shlb-f3zX2Hkj5zeX4v-OFbvutN5HeNMBCTETmMTUJodjbu1', 
      description: 'German Noodle', category: 'something'},
      {id: 'asd98adaa', title: 'Spaetzle2', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Shlb-f3zX2Hkj5zeX4v-OFbvutN5HeNMBCTETmMTUJodjbu1', 
      description: 'German Noodle2', category: 'something2'},
      {id: '987adaddf', title: 'Spaetzle3', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Shlb-f3zX2Hkj5zeX4v-OFbvutN5HeNMBCTETmMTUJodjbu1', 
      description: 'German Noodle3', category: 'something3'},
    ],
  }),
}
</script>

<style>

</style>