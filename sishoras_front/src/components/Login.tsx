import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/styles/Login.css';
import loginImage from '../assets/images/login.png';
import axios from 'axios';

const Login = () => {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [usuarioNome, setUsuarioNome] = useState('');



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                cpf,
                senha
            });
            const { tipoDeAcesso, nome,id,idCurso } = response.data; // Obter o nome

            if (nome) {
                setUsuarioNome(nome.split(' ')[0]); // Pega o primeiro nome
                // Armazenar o nome completo no localStorage
                localStorage.setItem('usuarioNome', nome);
                localStorage.setItem('usuarioId', id);
                localStorage.setItem('cursoId',idCurso); 
            }

            // Limpar mensagem de erro após login bem-sucedido
            setErrorMessage('');
            // Redirecionamento conforme o tipo de acesso
            setTimeout(() => {
                if (tipoDeAcesso === 'root') {
                    window.location.href = '/admin';
                } else if (tipoDeAcesso === 'coordenador') {
                    window.location.href = '/coordenador';
                } else if (tipoDeAcesso === 'aluno') {           
                    window.location.href = '/aluno';                
                } else {
                    setErrorMessage('Tipo de acesso desconhecido');
                }
            }, 1000);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setErrorMessage('Falha no login. Verifique suas credenciais.');
        }
    };

    // Reseta a mensagem de erro quando o usuário digita novamente no CPF ou Senha
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCpf(e.target.value);
        if (errorMessage) setErrorMessage(''); // Limpa a mensagem de erro quando o usuário começa a digitar
    };

    const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSenha(e.target.value);
        if (errorMessage) setErrorMessage(''); // Limpa a mensagem de erro quando o usuário começa a digitar
    };

    return (
        <div className="login-container">
            <img src={loginImage} alt="Login" className="login-image" />
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Matricula-Aluno / Cpf-Coordenador"
                    className="login-input"
                    value={cpf}
                    onChange={handleCpfChange} // Reset de erro no CPF
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="login-input"
                    value={senha}
                    onChange={handleSenhaChange} // Reset de erro na senha
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>Entrar
                </button>
                <div className="login-links">
                    <a href="/cadastro">Novo Cadastro</a>
                    <span> | </span>
                    <a href="/esqueceu-senha">Esqueceu a Senha?</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
