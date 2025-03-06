export default{
    apptype: "mpa",
    build: {
        rollupOptions: {
            input: {
                index: "index.html",
                login: "./src/login.html",
                about: "./src/home.html",
                perfil: "./src/perfil.html",
            },
        },
    },
};