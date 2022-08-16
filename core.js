module.exports = class Core {
   env;
   api;
   client;
   clips;
   constructor(api, client, env) {
      this.api = api;
      this.client = client;
      this.env = env;
   }
   buildOptions = function(cursor, amount) {
      let options = {
         search: {
            broadcaster_id: this.env.TWITCH_BROADCAST_ID,
         }
      };
      if(cursor) {
         options.search.after = cursor;
      }
      if(amount) {
         options.search.first = amount;
      }
      return options;
   };
   getClips = async function(options) {
      return await this.api
         .get('clips', options)
         .then(
            response => {
               if(response.data.length) {
                  if(response.pagination.cursor) {
                     return this.getClips(this.buildOptions(response.pagination.cursor, options.search.first))
                        .then(
                           (value) => {
                              let data = [];
                              data = value.concat(response.data);
                              return data;
                           }
                        );
                  } else {

                     return response.data;

                  }
               }
            }
         );
   }
   /**
    * returns all clips as an array
    */
   fetchAllClips = async function() {
      
      return await this.getClips(this.buildOptions(null, 100));
      //console.log(buildOptions(null));
      //return Promise.resolve(clips);
   }
   fetchLastClips = function() {
      this.api
         .get('clips', { search: { broadcaster_id: this.env.TWITCH_BROADCAST_ID } })
         .then(response => {
            console.log(response);
         });
   }
};