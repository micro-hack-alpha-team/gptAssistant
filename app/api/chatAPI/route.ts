import { convertTextToArrayOfObjects } from '@/lib';
import {Ged, QuestionAnswer, connect} from '@/lib/database'
import {GoogleGenerativeAI} from "@google/generative-ai"

const example =`Manuel d'Utilisation - Création, Validation et Transformation de Fichiers
        Introduction
        Ce manuel d'utilisation fournit des instructions détaillées pour effectuer les tâches de création de fichier, de validation et de transformation à l'aide de notre logiciel. Suivez ces étapes pour tirer le meilleur parti de notre système et maximiser votre efficacité dans la gestion des fichiers.
        
        1. Création de Fichier
        1.1. Accéder à l'Interface de Création:
        
        Connectez-vous à votre compte utilisateur.
        Dans le menu principal, sélectionnez "Créer un nouveau fichier".
        1.2. Sélectionner le Type de Fichier:
        
        Choisissez le type de fichier que vous souhaitez créer parmi les options disponibles (par exemple, document texte, feuille de calcul, présentation).
        1.3. Remplir les Informations Requises:
        
        Remplissez les champs obligatoires tels que le titre, la description et les métadonnées du fichier.
        1.4. Ajouter le Contenu:
        
        Utilisez l'éditeur intégré pour saisir le contenu du fichier ou importez-le à partir d'une source externe si nécessaire.
        1.5. Enregistrer le Fichier:
        
        Une fois que le fichier est complété, cliquez sur le bouton "Enregistrer" pour sauvegarder le fichier dans le système.
        2. Validation de Fichier
        2.1. Accéder à la Validation:
        
        Dans le menu principal, sélectionnez "Validation de fichier".
        2.2. Sélectionner le Fichier à Valider:
        
        Choisissez le fichier que vous souhaitez valider parmi la liste des fichiers disponibles.
        2.3. Examiner les Erreurs:
        
        Si des erreurs sont détectées lors de la validation, examinez-les dans le rapport de validation fourni.
        2.4. Corriger les Erreurs:
        
        Corrigez les erreurs identifiées dans le fichier en effectuant les modifications nécessaires.
        2.5. Valider à Nouveau:
        
        Une fois les corrections apportées, répétez le processus de validation pour vous assurer que le fichier est conforme aux normes requises.
        3. Transformation de Fichier
        3.1. Accéder à la Transformation:
        
        Dans le menu principal, sélectionnez "Transformation de fichier".
        3.2. Sélectionner le Fichier à Transformer:
        
        Choisissez le fichier que vous souhaitez transformer parmi la liste des fichiers disponibles.
        3.3. Sélectionner le Format de Sortie:
        
        Choisissez le format de fichier de sortie souhaité pour la transformation (par exemple, PDF, CSV, HTML).
        3.4. Configurer les Paramètres de Transformation:
        
        Sélectionnez les options de configuration telles que la mise en forme, les filtres et les paramètres de conversion.
        3.5. Lancer la Transformation:
        
        Cliquez sur le bouton "Transformer" pour démarrer le processus de transformation.
        3.6. Télécharger le Fichier Transformé:
        
        Une fois la transformation terminée, téléchargez le fichier transformé sur votre appareil.
        `

    
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
export async function POST(req: Request): Promise<Response> {
  try{
  await connect()
      const {documentation} = await req.json()
      const promptToAi = `Imaginez que vous êtes un instructeur chargé de guider les utilisateurs à travers un logiciel de gestion électronique des documents. Utilisez le manuel d'utilisation pour générer autant de questions que maximum, accompagnées de réponses détaillées, afin d'expliquer comment utiliser efficacement le logiciel. la forme de question/réponse (Q:[contenu]
        R:[contenu] et catégoriser les questions selon le context`
    
      const result = await model.generateContent(`
        ${promptToAi} et voici le manual d'utilisation suivant : ${documentation}
      `);
      const response = await result.response;
      const text = response.text();
      const objects = convertTextToArrayOfObjects(text);
        /*Ged.create({}).then(gedCreated => {
          objects.map(async obj => await QuestionAnswer.create({
              ...obj,
              gedId:gedCreated._id
          }))
        })*/
        console.log(objects)
        return new Response(JSON.stringify(objects))
      } catch (error) {
        console.error(error);
        return new Response('Error', { status: 500 });
      }
    }
    