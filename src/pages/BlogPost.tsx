import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Bookmark, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { blogPosts } from "@/data/mockData";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  const relatedPosts = blogPosts.filter((p) => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Article introuvable</h1>
          <Link to="/blog"><Button className="bg-primary text-primary-foreground">Retour au blog</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero header */}
      <div className="gradient-hero pattern-islamic py-16 md:py-20 relative overflow-hidden">
        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-10 right-20 w-12 h-12 border border-primary-foreground/10 rounded-full" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="text-primary-foreground/60 text-sm flex items-center gap-1 mb-6 hover:text-primary-foreground transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour au blog
            </Link>
          </motion.div>
          <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block text-xs font-semibold bg-accent text-accent-foreground px-3 py-1 rounded-full mb-4">
            {post.category}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-5">
            {post.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
            <span className="font-medium">Par {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(post.date).toLocaleDateString("fr-FR", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        {/* Featured image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden mb-10 -mt-10 relative z-10 shadow-2xl"
        >
          <img src={post.image} alt={post.title} className="w-full h-72 md:h-96 object-cover" />
        </motion.div>

        <div className="flex gap-10">
          {/* Share sidebar (desktop) */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:flex flex-col gap-3 sticky top-28 self-start"
          >
            <span className="text-xs text-muted-foreground font-medium mb-1">Partager</span>
            {[Facebook, Twitter, Share2, Bookmark].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            ))}
          </motion.aside>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1 min-w-0"
          >
            <div className="prose prose-lg max-w-none">
              {post.content.split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-foreground/80 leading-relaxed mb-5 text-base md:text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ) : null
              )}
            </div>

            {/* Mobile share */}
            <div className="flex lg:hidden items-center gap-3 mt-8 pt-6 border-t border-border">
              <span className="text-xs text-muted-foreground font-medium">Partager :</span>
              {[Facebook, Twitter, Share2, Bookmark].map((Icon, i) => (
                <motion.button key={i} whileHover={{ scale: 1.1 }} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-8 md:p-10 gradient-hero pattern-islamic rounded-2xl text-center"
            >
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">Inspiré pour aider ?</h3>
              <p className="text-primary-foreground/80 mb-6">Votre soutien rend ces histoires possibles.</p>
              <Link to="/donate">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg">
                    Faire un don
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.article>
        </div>

        {/* Related posts */}
        <div className="mt-16 pt-12 border-t border-border">
          <h3 className="font-display text-2xl font-bold text-foreground mb-8">Articles similaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost, i) => (
              <motion.div
                key={rPost.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link to={`/blog/${rPost.id}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="h-44 overflow-hidden">
                    <img src={rPost.image} alt={rPost.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary bg-emerald-light px-2 py-1 rounded-full">{rPost.category}</span>
                    <h4 className="font-display text-base font-semibold text-card-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">{rPost.title}</h4>
                    <span className="text-primary text-sm font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire la suite <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
