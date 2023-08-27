/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bem vindo ao Saúde para todos. Aqui você poderá receber dicas sobre como manter uma vida saudável '+
        'ou avaliar a sua Saúde. Então, vamos lá! Primeiro me fale o seu Primeiro nome.';
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/*
const AskOpenAIIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskOpenAIIntent';
    },
    async handle(handlerInput) {
        const question =
            Alexa.getSlotValue(handlerInput.requestEnvelope, 'question');

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: question,
            temperature: 0,
            max_tokens: 1500,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        });

        const speakOutput = response.data.choices[0].text +
            '.\nGostaria de perguntar mais alguma coisa?';
            
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            
            datasource.headlineTemplateData.properties.textContent.primaryText.text = response.data.choices[0].text
            
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("Posso ajudar com mais alguma coisa?")
            .getResponse();
    }
}; */


const DicasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DicasIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Entendi! Você quer saber sobre dicas de saúde. Para te enviar as dicas certas,'+
        'preciso te avaliar. Primeiro, me fale o seu peso.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AvaliacaoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AvaliacaoIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Entendi! Você quer realizar uma avaliação de Saúde. Agora, me fale a sua altura.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const NomeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NomeIntent';
    },
    handle(handlerInput) {
        const {requestEnvelope,responseBuilder} = handlerInput;
        const {intent} = requestEnvelope.request;
        
        let speakOutput = 'Não compreendi.';
        
        if (intent.confirmationStatus === 'CONFIRMED') {
            const nome = Alexa.getSlotValue(requestEnvelope, 'nome');
            
            speakOutput = 'Olá ' + nome + '. Agora me fale o que você deseja. Você pode escolher entre dicas de saúde ou uma avaliação de saúde. O que você quer?';
        } else {
            speakOutput = 'Não entendi! Vamos tentar novamente. Me fale o seu primeiro nome.';
            responseBuilder.reprompt(speakOutput);
            
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const IMCIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IMCIntent';
    },
    handle(handlerInput) {
        const {requestEnvelope,responseBuilder} = handlerInput;
        const {intent} = requestEnvelope.request;
        
        let speakOutput = 'Entendi! Sua altura e seu peso estão sendo calculados, um momento';
        
        if (intent.confirmationStatus === 'CONFIRMED') {
            const peso = Alexa.getSlotValue(requestEnvelope, 'peso');
            const metro = Alexa.getSlotValue(requestEnvelope, 'metro');
            const centimetro = Alexa.getSlotValue(requestEnvelope, 'centimetros');
            //const nome = Alexa.getSlotValue(requestEnvelope,'nome');
            
            
            
            
            let altura = (metro+centimetro)/100;
            let IMC = peso / (altura*altura);
            IMC = IMC.toFixed(2);
            
            speakOutput = 'Consegui entender o seu peso e altura. Sua altura é ' +altura+' metros e seu peso é ' +peso+ 'quilos e seu IMC é '+ IMC +'.';
            if(IMC<18.5){
               speakOutput = speakOutput + ' Atenção! Seu IMC está abaixo do peso normal o que indica que você terá que fazer uma dieta para ganhar massa. Consulte um nutricionista.'  
            }else if(IMC <25){
                speakOutput = speakOutput + ' Seu IMC está normal, parabéns! Mantenha uma dieta balanceada e pratique exercícios físicos para manter a saúde!'  
            }else if(IMC <30){
               speakOutput = speakOutput + ' você está com sobrepeso. fique atento. Pratique exercícios físicos e matenha uma dieta balanceada para voltar ao seu peso normal.'+
               ' Consulte um nutricionista.'
            }else if(IMC <35){
                speakOutput = speakOutput + ' Atenção! Você está obeso. A obesidade pode acarretar diversas doenças, ocasionando uma perda da sua qualidade de vida e consequentemente'+
                ' pode levar uma pessoa ao óbito. Existem diversos fatores que podem levar uma pessoa a obesidade como disturbios hormonais, psicológicos ou disfunções alimentares.'+
                ' Procure um nutrólogo. Ele te orientará e encaminhará para os profissionais que poderão te ajudar.'
            }else if(IMC >=35){
                speakOutput = speakOutput + ' Atenção! Você está com obesidade mórbida. A obesidade pode acarretar diversas doenças, ocasionando uma perda da sua qualidade de vida e consequentemente'+
                ' pode levar uma pessoa ao óbito. Existem diversos fatores que podem levar uma pessoa a obesidade como disturbios hormonais, psicológicos ou disfunções alimentares.'+
                ' Procure um nutrólogo. Ele te orientará e encaminhará para os profissionais que poderáo te ajudar. Mantenha uma vida saudável com exercicios e uma dieta balanceada.'
                
            }
        } else {
            speakOutput = 'Não entendi! Vamos tentar uma informação por vez. Primeiro, me fale o seu peso em quilos.';
            responseBuilder.reprompt(speakOutput);
            
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Você quer receber uma dica de saude? Responda receber dica de saúde')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Ei! Estou aqui para te ajudar.Agora me fale o que você deseja. Você pode escolher dicas de saúde ou uma avaliação de saúde. O que Você deseja?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adeus!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Eu não entendi. Vamos tentar de novo ? Me fale o que você deseja. Você pode escolher dicas de saúde ou uma avaliação de saúde. O que vai querer?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Eu não entendi. Vamos tentar de novo ? Me fale o que você deseja. Você pode escolher dicas de saúde ou uma avaliação de saúde. O que vai querer?';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        IMCIntentHandler,
        NomeIntentHandler,
       // AskOpenAIIntentHandler,
        LaunchRequestHandler,
        DicasIntentHandler,
        HelpIntentHandler,
        AvaliacaoIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();