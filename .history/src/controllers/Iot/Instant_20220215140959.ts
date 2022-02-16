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
        parseInt(data["payload"]["hardwareTimeStamp"].toString().replace(".", "").substring(0, 13))
      );

      // Conexão com o mongo
      const connection = await main("dev", "livioTemp");
      connection;

      // // Salvando pacote
      // await connection.collection("livioTemp").insertOne(data, (err) => {
      //   if (err) {
      //     console.error(`Erro at setNewDataLivioTemp while inserting ${data["plant"]} `);
      //   }
      // });
      // resposta de retorno
      return response.status(200).send({
        code: "Package saved!",
        plant: data["plant"],
      });
    } catch (error) {
      console.error("Package: ", request["body"]);
      console.error("Error at method setNewDataLivioTemp: ", error);
      return response.status(error["code"] ? error["code"] : 500).send({
        error: "Error at method setNewDataLivioTemp",
        message: error["message"],
      });
    }
  }
}

export default new IoTInstant();
