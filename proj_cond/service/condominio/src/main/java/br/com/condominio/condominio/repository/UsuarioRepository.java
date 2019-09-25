package br.com.condominio.condominio.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.condominio.condominio.domain.Usuario;

@Transactional
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
