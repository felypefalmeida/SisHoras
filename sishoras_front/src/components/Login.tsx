import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/styles/Login.css';
import loginImage from '../assets/images/login.png';
import axios from 'axios';

const Login = () => {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Evita o recarregamento da página

        try {
            const response = await axios.post('http://localhost:3000/auth/login', { // Altere para a URL do seu backend
                cpf,
                senha
            });
            console.log('Login bem-sucedido:', response.data);
            // Aqui você pode redirecionar o usuário ou armazenar o token
            // Se o login for bem-sucedido, obtenha os dados do usuário
            const { tipoDeAcesso} = response.data;
            if (tipoDeAcesso === 'root') {
                // Redirecionar para a página do administrador
                window.location.href = '/admin';
            } else if (tipoDeAcesso === 'coordenador') {
                // Validando o CPF (precisa ter 11 dígitos)
                if (cpf.length === 11) {
                    window.location.href = '/coordenador';
                } else {
                    alert('CPF inválido para coordenador');
                }
            } else if (tipoDeAcesso === 'aluno') {
                // Validando a matrícula (precisa ter 14 dígitos)
                if (cpf.length === 14) {
                    window.location.href = '/aluno';
                } else {
                    alert('Matrícula inválida para aluno');
                }
            } else {
                // Caso o tipo de acesso não seja reconhecido
                alert('Tipo de acesso desconhecido');
            }      
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Falha no login. Verifique suas credenciais.');
        }
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
                    onChange={(e) => setCpf(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="login-input"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
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
