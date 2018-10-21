<template>
  <div class="hello">
    <button @click="createDummyPlay"> create play</button>
  </div>
</template>

<script>
/* eslint-disable */
import ObjectId from 'bson-objectid'
export default {
  name: 'HelloWorld',
  props: {
    app: { type: Object }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App, idiot'
    }
  },
  methods: {
    async createDummyPlay() {
      // let {data} = await this.app.service('plays').find({})
      // await this.app.service('plays').remove(data[0]._id)
      const team = new ObjectId()
      const team2 = new ObjectId()
      const offensivePlay = [
        {player:{
          name: 'JASON KELCE',
          stats: {
            size: 8,
            strength: 8,
            speed: 3,
            skill: 3,
            smart: 4
          },
          position: 'C',   
          jerseyNumber: 62,
          teamId: team
        },
        coordinates: {
          x:80,
          y:270
        }
        },
        {player:{
          name: 'DAVID DECASTRO',
          stats: {
            size: 7,
            strength: 9,
            speed: 2,
            skill: 3,
            smart: 3
          },
          position: 'LG',
          jerseyNumber: 66,
          teamId: team
        },
        coordinates: {
          x:75,
          y:270
        }
        },{player:{
          name: 'ZACK MARTIN',
          stats: {
            size: 9,
            strength:8,
            speed: 3,
            skill: 5,
            smart: 2
          },
          position: 'RG',
          jerseyNumber: 70,
          teamId: team
        },
        coordinates: {
          x:85,
          y:270
        }
        },{player:{
          name: 'DAVID BAKHTIARI',
          stats: {
            size: 7,
            strength:7,
            speed: 5,
            skill: 5,
            smart: 2
          },
          position: 'LT',
          jerseyNumber: 69,
          teamId: team
        },
        coordinates: {
          x:70,
          y:270
        }
        },{player:{
          name: 'DARYL WILLIAMS',
          stats: {
            size: 9,
            strength:8,
            speed: 3,
            skill: 5,
            smart: 2
          },
          position: 'RT',
          jerseyNumber: 60,
          teamId: team
        },
        coordinates: {
          x:90,
          y:270
        }
        },{player:{
          name: 'ROB GRONKOWSKI',
          stats: {
            size: 8,
            strength:8,
            speed: 6,
            skill: 7,
            smart: 3
          },
          position: 'TE',
          jerseyNumber: 87,
          teamId: team
        },
        coordinates: {
          x:95,
          y:270
        }
        },{player:{
          name: 'JIMMY GRAHAM',
          stats: {
            size: 8,
            strength:6,
            speed: 7,
            skill: 6,
            smart: 4
          },
          position: 'TE',
          jerseyNumber: 80,
          teamId: team
        },
        coordinates: {
          x:100,
          y:275
        }
        },{player:{
          name: 'ANTONIO BROWN',
          stats: {
            size: 3,
            strength:5,
            speed: 9,
            skill: 8,
            smart: 6
          },
          position: 'WR',
          jerseyNumber: 84,
          teamId: team
        },
        coordinates: {
          x:140,
          y:275
        }
        },{player:{
          name: 'JULIO JONES',
          stats: {
            size: 7,
            strength:6,
            speed: 9,
            skill: 7,
            smart: 5
          },
          position: 'WR',
          jerseyNumber: 70,
          teamId: team
        },
        coordinates: {
          x:20,
          y:270
        }
        },{player:{
          name: 'SAQUON BARKLEY',
          stats: {
            size: 6,
            strength:9,
            speed: 8,
            skill: 7,
            smart: 4
          },
          position: 'RB',
          jerseyNumber: 26,
          teamId: team
        },
        coordinates: {
          x:80,
          y:300
        }
        },{player:{
          name: 'DREW BREES',
          stats: {
            size: 4,
            strength:5,
            speed: 6,
            skill: 9,
            smart: 9
          },
          position: 'QB',
          jerseyNumber: 9,
          teamId: team
        },
        coordinates: {
          x:80,
          y:280
        }
        }
      ]
      const defensivePlay = [
        {player:{
          name: 'AARON DONALD',
          stats: {
            size: 6,
            strength: 10,
            speed: 6,
            skill: 7,
            smart: 4
          },
          position: 'DT',
          jerseyNumber: 99,
          teamId: team2
        },
        coordinates: {
          x:80,
          y:271
        }
        },
        {player:{
          name: 'KHALIL MACK',
          stats: {
            size: 7,
            strength: 9,
            speed: 7,
            skill: 5,
            smart: 3
          },
          position: 'LE',
          jerseyNumber: 52,
          teamId: team2
        },
        coordinates: {
          x:90,
          y:271
        }
        },{player:{
          name: 'JJ WATT',
          stats: {
            size: 8,
            strength:10,
            speed: 5,
            skill: 4,
            smart: 3
          },
          position: 'RE',
          jerseyNumber: 98,
          teamId: team2
        },
        coordinates: {
          x:70,
          y:271
        }
        },{player:{
          name: 'VON MILLER',
          stats: {
            size: 7,
            strength:8,
            speed: 8,
            skill: 7,
            smart: 5
          },
          position: 'LOLB',
          jerseyNumber: 58,
          teamId: team2
        },
        coordinates: {
          x:97,
          y:273
        }
        },{player:{
          name: 'LUKE KUECHLY',
          stats: {
            size: 7,
            strength:7,
            speed: 7,
            skill: 7,
            smart: 6
          },
          position: 'MLB',
          jerseyNumber: 60,
          teamId: team2
        },
        coordinates: {
          x:85,
          y:280
        }
        },{player:{
          name: 'BOBBY WAGNER',
          stats: {
            size:5,
            strength:6,
            speed: 6,
            skill: 8,
            smart: 6
          },
          position: 'MLB',
          jerseyNumber: 87,
          teamId: team2
        },
        coordinates: {
          x:75,
          y:280
        }
        },{player:{
          name: 'TERRELL SUGGS',
          stats: {
            size: 7,
            strength:9,
            speed: 5,
            skill: 6,
            smart: 4
          },
          position: 'ROLB',
          jerseyNumber: 80,
          teamId: team2
        },
        coordinates: {
          x:62,
          y:271
        }
        },{player:{
          name: 'RICHARD SHERMAN',
          stats: {
            size: 7,
            strength:3,
            speed: 8,
            skill: 9,
            smart: 7
          },
          position: 'CB',
          jerseyNumber: 25,
          teamId: team2
        },
        coordinates: {
          x:140,
          y:275
        }
        },{player:{
          name: 'PATRICK PETERSON',
          stats: {
            size: 5,
            strength:4,
            speed: 9,
            skill: 7,
            smart: 5
          },
          position: 'CB',
          jerseyNumber: 70,
          teamId: team2
        },
        coordinates: {
          x:20,
          y:271
        }
        },{player:{
          name: 'ERIC BERRY',
          stats: {
            size: 4,
            strength:5,
            speed: 8,
            skill: 8,
            smart: 6
          },
          position: 'SS',
          jerseyNumber: 26,
          teamId: team2
        },
        coordinates: {
          x:90,
          y:300
        }
        },{player:{
          name: 'HA HA CLINTON-DIX',
          stats: {
            size: 5,
            strength:6,
            speed: 8,
            skill: 9,
            smart: 5
          },
          position: 'FS',
          jerseyNumber: 22,
          teamId: team2
        },
        coordinates: {
          x:70,
          y:300
        }
        }
      ]

      let res = await this.app.service('plays').create({
        defensivePlay,offensivePlay
      })
      console.log(res)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
