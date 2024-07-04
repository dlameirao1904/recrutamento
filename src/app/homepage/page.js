"use client"
import { useState } from "react";
import { Button, Input } from "@nextui-org/react"

const Homepage = () => {
    const [fileContent, setFileContent] = useState("");
    const [autor1, setAutor1] = useState("");
    const [autor2, setAutor2] = useState("");
    const [livros, setLivros] = useState(0)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                setFileContent(text);
            };
            reader.readAsText(file);
        }
    };

    const procurar = () => {
        const lines = fileContent.split("\n").filter(line => line.trim() !== "");
        const count = lines.reduce((acc, line) => {
            const autores = line.split(", ").slice(0, -1);
            if (autores.includes(autor1) && autores.includes(autor2)) {
                return acc + 1;
            }
            return acc;
        }, 0);
        return count;
    }

    const calcular = () => {
        const count = procurar();
        setLivros(count);
        console.log("count", count)
    }

    console.log("livros", livros)

    return (
        <div className="flex flex-col gap-8">
            <div>
                Insira o seu ficheiro.
            </div>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            {fileContent && (
                <div className="mt-4 flext gap-4">
                    <h3>Insira dois autores:</h3>

                    <div>
                        <Input
                            type="text"
                            label="Autor 1"
                            value={autor1}
                            onValueChange={setAutor1}
                            className="text-black"
                        />
                    </div>

                    <div>
                        <Input
                            type="text"
                            label="Autor 2"
                            value={autor2}
                            onValueChange={setAutor2}
                            className="text-black"
                        />
                    </div>

                    <div>
                        <Button
                            color="bg-blue-500"
                            onClick={calcular}
                        >
                            Procurar
                        </Button>
                    </div>




                    <div>Numero de Livros: {livros}</div>


                    

                </div>
            )}
        </div>
    );
};

export default Homepage;
