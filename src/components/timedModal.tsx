import { useEffect, useState } from "react";

export const TimedModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setIsOpen(false);
          window.location.reload(); 
        }, 5000);
    
        return () => {
          clearTimeout(timeoutId);
        };
      }, []);
    
    const responses = [
      "Oh, a bot pretending to be human? Reloading the page to see if you can handle a simple equation next time",
      "Looks like my equation exposed you as a bot. Reloading the page to give you another shot!",
      "So, a bot can't solve equations without crashing the page? Reloading to give you another try",
      "Interesting, a bot failing at math. Reloading the page to see if you can do better",
      "Seems like your bot nature got exposed. Reloading the page to see if you can handle it now",
      "Caught you, bot! Time for a page reload to see if you can solve the equation this time",
      "A bot failing an equation and reloading the page? Classic. Let's see if you do better next time",
      "So, you're a bot after all? Reloading the page to give you another chance at solving this equation",
    ];

     const getResponse = (array: string[]) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      }

    return (
       isOpen ? ( <div className="modal-wrapper">
            <div className="modal timed-modal">
                <h2>😡</h2>
                <p>{getResponse(responses)}</p>
            </div>
        </div> ) : null
    )
}