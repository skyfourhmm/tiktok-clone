import * as request from "../utils/request";

export const video = async ({type , page = 1}) => {
    try {
      const res = await request.get('videos', {
        params: {
          type,
          page
        },
      })
      return res
    } catch(error) {
        console.log(error)
    }
  }
