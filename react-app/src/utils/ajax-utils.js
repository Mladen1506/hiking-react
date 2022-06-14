

export const convert_to_json = (data) => {
  let json = '';
  try{
    json = JSON.stringify(data);
  } catch (err){
    console.log(err);
  }
  return json;
};