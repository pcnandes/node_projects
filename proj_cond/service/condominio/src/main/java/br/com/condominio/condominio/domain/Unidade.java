package br.com.condominio.condominio.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
public class Unidade {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String nome;
	private String andar;
	@ManyToOne
	private Bloco bloco;
	@ManyToOne
	private Usuario usuario;
}
