package br.com.condominio.condominio.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String apelido;
	private String senha;
	private String email;
	private String perfis;
	private String cpf;
	private String nome;
	private String telefone;
	private String celular1;
	private String celular2;
}
