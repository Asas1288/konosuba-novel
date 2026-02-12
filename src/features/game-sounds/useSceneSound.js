import { useEffect, useRef } from "react";

// Я не ебу как я это сделал...
export const useSceneSound = (soundName, sceneInx) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (!soundName) return;

        const playSound = async () => {
            try {
                // Останавливаем предыдущий звук
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
                
                // Динамический импорт
                const soundModule = await import(`@shared/styles/assets/sounds/${soundName}.mp3`);
                
                audioRef.current = new Audio(soundModule.default);
                audioRef.current.volume = 0.5;
                await audioRef.current.play();
            } catch(err) {
                console.log(`Ошибка звука: ${err}`);
            }
        };

        playSound();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [soundName, sceneInx]);

    return audioRef;
};