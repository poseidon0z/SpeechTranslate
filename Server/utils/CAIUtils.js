import CAINode from 'cainode';
import fs, { readFileSync } from 'fs';

const PATH = "./storage/CAIConfigFile.json";

const Client = new CAINode();

export async function CAIConfig(token,char_id){
    
    const data = {"token": token, "char_id": char_id};
    fs.writeFileSync(PATH,JSON.stringify(data),()=>{
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

export async function GetResponse(message){
    var data = fs.readFileSync(PATH,'utf-8');
    data = JSON.parse(data);
    
    await Client.character.send_message(message,true,"");
    
    const rawResponse = Client.character.generate_turn();

    return rawResponse;

}
