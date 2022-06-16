

export const convert_to_json = (data) => {
  let json = '';
  try{
    json = JSON.stringify(data);
  } catch (err){
    console.log(err);
  }
  return json;
};
/*
export const json_to_js = (json) => {
  let obj = '';
  try{
    obj = JSON.parse(json);
  } catch (err){
    console.log(err);
  }
  return obj;
};
*/