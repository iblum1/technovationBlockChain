import {environment} from "../../environments/environment";

export class Endpoints {
  public static readonly COMMODITY: string = environment.baseUrl + "Commodity";
  public static readonly TRADE: string = environment.baseUrl + "Trade";
  public static readonly TRADER: string = environment.baseUrl + "Trader";
}
