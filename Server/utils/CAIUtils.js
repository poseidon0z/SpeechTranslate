import CAINode from 'cainode';
import fs from 'fs';

const Client = new CAINode();

async function CAIConfig(token,char_id){
    const data = {"token": token, "char_id": char_id};
    fs.writeFileSync("../storage/CAIConfFile.json",data,()=>{
            console.log("Config Saved!");
    });

    try{
        const loginStatus = await Client.login(token);
        if(!loginStatus){
            return JSON.stringify({"Status" : "Login Failed!"});
        }else{
            const connectionStatus = await Client.character.connect(char_id);
            return connectionStatus?(JSON.stringify({"Status":"Connected"})):({"Status": "Failed To Connect"});
        }
    }catch(error){
        console.error("Failed To Connect To CAI Client");
    }
}


export default {CAIConfig};