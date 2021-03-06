import { Request, Response } from "express";
import { main } from "../../database/mongoDb";

class IoTInstant {
  async create(request: Request, response: Response) {
    try {
      // corpo da requisição
      const data = request["body"];

      // Verificação de existencia da planta
      if (!data["plant"] || typeof data["plant"] === "undefined") {
        console.error(`package from plant: ${data["plant"]}`);
        throw {
          code: 400,
          massageType: "The data reported is bad formated, check the data sent",
        };
      }

      // Cria o timestamp de quando o pacote foi recebido no servidor
      data["serverTimestamp"] = new Date();

      // Converte o timestamp do hardware de campo em Date format
      data["createdAt"] = new Date(
        parseInt(data["hardwareTimeStamp"].toString().replace(".", "").substring(0, 13))
      );

      // Conexão com o mongo
      const connection = await main("dev", "Temp");
      const result = await connection.insertOne(data, (err, result) => {
        if (err) {
          console.error(`Erro at setNewDataTemp while inserting ${data["plant"]} `);
        }
      });
      console.log(result);
      // resposta de retorno
      return response.status(200).send({
        code: "Package saved!",
        plant: data["plant"],
      });
    } catch (error) {
      console.error("Package: ", request["body"]);
      console.error("Error at method setNewDataTemp: ", error);
      return response.status(error["code"] ? error["code"] : 500).send({
        error: "Error at method setNewDataTemp",
        message: error["message"],
      });
    }
  }
}

export default new IoTInstant();
