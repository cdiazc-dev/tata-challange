  
const hello = async (event, context) => {
  console.log('[INFO] Starting with the Lambda hello');
  return {
    statusCode: 200,
    body: JSON.stringify({
      title: 'This API is successfully!!!',
    }),
  };
};


export const handler = hello;