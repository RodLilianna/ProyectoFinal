export interface RecomendacionViewModel {
    id: string;
    tipoDeSuelo: string;
    humedadTerreno: string;
    drenaje: string;
    luzSolar: string;
    tipoDeRiego: string;
    tipoDeFertilizacion: string;
    problemasDePlagas: boolean;
    tamanoTerreno: string;
    usuarioId: string;
    recomendacion: {
      id: number;
      cultivosRecomendados: string;
      razonRecomendacion: string;
      pasosASeguir: string;
      consejosDeCuidado: string;
      descripcionRecomendacion: string;
    };
  }
  