package br.com.condominio.condominio.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Builder;
import lombok.Getter;

@Entity
@Getter @Builder
public class Usuario {

	@Id
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
