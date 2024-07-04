"use client"
import { useState, useEffect } from "react";
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

    const [indexedData, setIndexedData] = useState({});
    useEffect(() => {
        const indexFileData = (text) => {
            const lines = text.split("\n").filter(line => line.trim() !== "");
            const indexed = {};

            lines.forEach(line => {
                const autores = line.split(", ").slice(0, -1);
                autores.forEach(autor => {
                    if (!indexed[autor]) {
                        indexed[autor] = [];
                    }
                    indexed[autor].push(line); 
                });
            });

            setIndexedData(indexed);
        };


        indexFileData(fileContent); 
    }, [fileContent]);

    const countBooksByAuthors = (author1, author2) => {
        let count = 0;
        if (indexedData[author1] && indexedData[author2]) {
            indexedData[author1].forEach(book1 => {
                indexedData[author2].forEach(book2 => {
                    if (book1 === book2) {
                        count++;
                    }
                });
            });
        }
        return count;
    };

    const countBooksByAuthor = (author) => {
        if (indexedData[author]) {
            return indexedData[author].length;
        }
        return 0;
    };

    const calcular = () => {
        let count = 0;
        if (autor1 && autor2) {
            count = countBooksByAuthors(autor1, autor2);
        } else if (autor1) {
            count = countBooksByAuthor(autor1);
        } else if (autor2) {
            count = countBooksByAuthor(autor2);
        }
        
        setLivros(count);
        console.log(count)
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                Insira o seu ficheiro.
            </div>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            {fileContent && (
                <div className="mt-4 flext gap-4">
                    <h3>Insira um ou dois autores:</h3>

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




                    { autor1 !== "" && autor2 === "" ?
                        <div>Numero de Livros escritos pelo o autor {autor1}: {livros}</div> :
                        <div>Numero de Livros escritos pelo o autor {autor1} com o co-autor2: {autor2}: {livros} </div>
                    }


                    

                </div>
            )}
        </div>
    );
};

export default Homepage;
