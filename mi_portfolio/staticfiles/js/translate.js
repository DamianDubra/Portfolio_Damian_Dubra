document.addEventListener("DOMContentLoaded", () => {

    const englishButton = document.getElementById("englishButton");
    const spanishButton = document.getElementById("spanishButton");

    let currentLanguage = "en";
    let translator = null;

    const originalTexts = new Map();


    /* NO TRADUCIR*/
    

    const ignoredTags = [
        "SCRIPT",
        "STYLE",
        "CODE",
        "PRE",
        "NOSCRIPT"
    ];


    /* NO TRADUCIR

    */

    const protectedTerms = [
        
        "Full Stack Web Developer",
        "Full Stack Developer",
        "Full-Stack Developer",
        "Full Stack Developer Jr.",
        "Backend Developer",
        "Frontend Developer",
        "Web Full Stack Developer Jr.",

        
        "REST API",
        "API",
        
        "VS Code",
        "Apache NetBeans",
        "Adobe Illustrator",
        "Adobe Photoshop",
        "AutoCAD",
        "OOP",
        "CMS",
        "frontend",
        "backend",

   
        "MICROSOFT EXCEL",
        "DATA ANALYST",

       
        "Damian Dubra",
        "Abrafer",
        "Iluminacion Center",
        "Dash Deportes",
        "Mercado Libre",
        "Kuky Showroom",
        "Full Stack Portfolio Web",

    
        "LinkedIn",
        "WhatsApp",
        "Email",
        "GitHub"
    ];


    

    function getTextNodes() {

        const root = document.querySelector(
            "[data-translate-page]"
        );

        if (!root) {
            console.error(
                "No se encontró [data-translate-page]"
            );

            return [];
        }

        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT
        );

        const nodes = [];

        let node;

        while (node = walker.nextNode()) {

            const parent = node.parentElement;

            if (!parent) {
                continue;
            }


           
            if (ignoredTags.includes(parent.tagName)) {
                continue;
            }

            if (
                parent.closest("[data-no-translate]")
            ) {
                continue;
            }


            if (!node.textContent.trim()) {
                continue;
            }


            nodes.push(node);
        }

        return nodes;
    }


    /*GUARDAR TEXTOS 

    */

    function saveOriginalTexts() {

        const nodes = getTextNodes();

        nodes.forEach(node => {

            if (!originalTexts.has(node)) {

                originalTexts.set(
                    node,
                    node.textContent
                );
            }

        });

        console.log(
            "Original texts saved:",
            originalTexts.size
        );
    }


    /*PROTEGER TÉRMINOS
    */

    function protectTerms(text) {

        const protectedValues = [];

        let protectedText = text;

        const sortedTerms = [...protectedTerms].sort(
            (a, b) => b.length - a.length
        );

        sortedTerms.forEach((term, index) => {

            const token = `\uE000${index}\uE001`;

            const regex = new RegExp(
                `(?<![\\w])${escapeRegExp(term)}(?![\\w])`,
                "gi"
            );

            if (regex.test(protectedText)) {

                protectedValues.push({
                    token: token,
                    value: term
                });

                protectedText = protectedText.replace(
                    regex,
                    token
                );
            }
        });

        return {
            text: protectedText,
            protectedValues: protectedValues
        };
    }


    function restoreProtectedTerms(
        translatedText,
        protectedValues
    ) {

        let result = translatedText;

        protectedValues.forEach(item => {

            result = result.replaceAll(
                item.token,
                item.value
            );

        });

        return result;
    }



    function escapeRegExp(string) {

        return string.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );
    }



    function restoreEnglish() {

        originalTexts.forEach(
            (originalText, node) => {

                if (node.parentNode) {

                    node.textContent =
                        originalText;
                }

            }
        );


        currentLanguage = "en";

        localStorage.setItem(
            "language",
            "en"
        );


        updateButtons();

        console.log(
            "English restored"
        );
    }



    async function createTranslator() {

        if (!("Translator" in self)) {

            throw new Error(
                "Translator API no está disponible."
            );
        }


        const availability =
            await Translator.availability({
                sourceLanguage: "en",
                targetLanguage: "es"
            });


        console.log(
            "Translator availability:",
            availability
        );


        if (availability === "unavailable") {

            throw new Error(
                "English → Spanish translation unavailable."
            );
        }


        translator = await Translator.create({

            sourceLanguage: "en",
            targetLanguage: "es",

            monitor(monitor) {

                monitor.addEventListener(
                    "downloadprogress",
                    event => {

                        const percentage =
                            Math.round(
                                event.loaded * 100
                            );

                        console.log(
                            `Translation model: ${percentage}%`
                        );
                    }
                );
            }
        });


        return translator;
    }



    async function translateToSpanish() {

        if (currentLanguage === "es") {
            return;
        }


        try {

            saveOriginalTexts();

            if (!translator) {

                spanishButton.disabled = true;

                spanishButton.textContent =
                    "Loading...";


                await createTranslator();


                spanishButton.disabled = false;

                spanishButton.textContent =
                    "Español";
            }


            for (
                const [node, originalText]
                of originalTexts
            ) {

                if (!node.parentNode) {
                    continue;
                }


                if (!originalText.trim()) {
                    continue;
                }


                try {


                    const protectedData =
                        protectTerms(originalText);


                    let translatedText =
                        await translator.translate(
                            protectedData.text
                        );


                    translatedText =
                        restoreProtectedTerms(
                            translatedText,
                            protectedData.protectedValues
                        );


                    node.textContent =
                        translatedText;


                } catch (error) {

                    console.error(
                        "Error translating:",
                        originalText,
                        error
                    );
                }
            }



            currentLanguage = "es";

            localStorage.setItem(
                "language",
                "es"
            );


            updateButtons();


            console.log(
                "Page translated to Spanish"
            );


        } catch (error) {

            console.error(
                "Translation error:",
                error
            );


            spanishButton.disabled = false;

            spanishButton.textContent =
                "Español";


            alert(
                "No se pudo realizar la traducción."
            );
        }
    }


    function updateButtons() {

        if (!englishButton || !spanishButton) {
            return;
        }



        englishButton.textContent =
            "English";

        spanishButton.textContent =
            "Español";


        if (currentLanguage === "es") {

            spanishButton.classList.add(
                "active"
            );

            englishButton.classList.remove(
                "active"
            );

        } else {

            englishButton.classList.add(
                "active"
            );

            spanishButton.classList.remove(
                "active"
            );
        }
    }


    if (spanishButton) {

        spanishButton.addEventListener(
            "click",
            translateToSpanish
        );
    }


    if (englishButton) {

        englishButton.addEventListener(
            "click",
            restoreEnglish
        );
    }


    saveOriginalTexts();

    updateButtons();

});